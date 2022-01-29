import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserRegisterInputModel } from '../../models/user-input-models'
import { Roles } from '../../common'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { HTTP_STATUS_CODES } from '../../common/global-constants'

const BUSINESS_HOLDER_REGISTRATION_TYPE = 'BusinessHolder'

class UsersController {

    public register = async (req: Request, res: Response): Promise<void> => {
        const user: UserRegisterInputModel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }

        const registrationType = req.query.type

        if (registrationType === BUSINESS_HOLDER_REGISTRATION_TYPE) {
            user.roles = [Roles.businessHolder]
            user.company = {
                description: req.body.description,
                address: req.body.address,
                availability: req.body.availability
            }
        }

        const createdUser = await UserService.register(user)
        if (!createdUser) {
            res.status(HTTP_STATUS_CODES.BAD_REQUEST).json('User with the same email already exists')
            return
        }

        const {
            accessToken,
            userData
        } = await UserService.login(user.email, user.password)

        res.json({
            token: accessToken,
            email: user.email,
            roles: user.roles,
            id: userData.id
        })
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const {
            email,
            password
        } = req.body
        const loginData = await UserService.login(email, password)

        if (!loginData) {
            res.status(400).json('Invalid username or password')
            return
        }

        res.json({
            token: loginData.accessToken,
            email: loginData.userData.email,
            id: loginData.userData.id
        })
    }

    public getFavourites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        // let userId = req.user.id
        // TODO: get the favourite users
        const response = [{
            firstName: 'Atanas',
            lastName: 'Vasilev',
            company: {
                description: 'some description',
                address: 'Sofia, Studentski grad',
                businessTypes: ['Hair Salon', 'Nail Salon']
            }
        }]

        res.json(response)
    }

    public addToFavourites = (req: AuthenticatedRequest, res: Response): void => {
        const userId = req.user.id
        const businessId = req.body.businessId
        UserService.addToFavourites(userId, businessId)
            .then(() => {
                res.json('Successfully added to favourites.')
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST)
                    .json('Problem while adding to favourites.')
            })
    }

    public removeFromFavourites = (req: AuthenticatedRequest, res: Response): void => {
        const userId = req.user.id
        const businessId = req.body.id
        UserService.removeFromFavourites(userId, businessId)
            .then(() => {
                res.json('Successfully remove from favourites.')
            })
            .catch(() => {
                res.status(HTTP_STATUS_CODES.BAD_REQUEST)
                    .json('Problem while removing from favourites.')
            })
    }

}

export default new UsersController()
