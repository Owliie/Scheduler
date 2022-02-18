import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserRegisterInputModel } from '../../models/user-input-models'
import { Roles } from '../../common'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { responseUtils } from '../../utils/response-utils.js'
import { validateRequest } from '../validators/validate-request'
import { CompanyValidators } from '../validators/company-validators'

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
            const companyValidationErrors = await validateRequest(req, CompanyValidators)
            if (companyValidationErrors) {
                return responseUtils.sendValidationError(res, companyValidationErrors)
            }

            user.roles = [Roles.businessHolder]
            user.company = {
                description: req.body.description,
                address: req.body.address,
                availability: UserService.buildDefaultAvailability(req.body.availability),
                businessType: null
            }
        }

        const createdUser = await UserService.register(user)
        if (!createdUser) {
            responseUtils.sendErrorMessage(res, 'User with the same email already exists.')
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
            responseUtils.sendErrorMessage(res, 'Invalid username or password.')
            return
        }

        res.json({
            token: loginData.accessToken,
            ...loginData.userData
        })
    }

    public profile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        res.json(await UserService.getProfileData(req.user?.id))
    }

    public updateProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone
        }

        UserService.updatePersonalData(req.user?.id, body)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while updating the user personal data.'))
    }

    public getFavourites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        res.json(await UserService.getFavouritesBusinesses(req.user?.id))
    }

    public addToFavourites = (req: AuthenticatedRequest, res: Response): void => {
        const userId = req.user?.id
        const businessId = req.body.businessId
        UserService.addToFavourites(userId, businessId)
            .then((result) => {
                responseUtils.processTaskResult(res, result)
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'Problem while adding to favourites.')
            })
    }

    public removeFromFavourites = (req: AuthenticatedRequest, res: Response): void => {
        const userId = req.user?.id
        const businessId = req.params.id
        UserService.removeFromFavourites(userId, businessId)
            .then((result) => {
                responseUtils.processTaskResult(res, result)
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'Problem while removing from favourites.')
            })
    }

    public setBusinessType = (req: AuthenticatedRequest, res: Response): void => {
        const businessTypeId = req.body.businessTypeId

        UserService.setBusinessType(req.user?.id, businessTypeId)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while setting the business type.'))
    }

    public setAvailability = (req: AuthenticatedRequest, res: Response): void => {
        const parsedAvailabilityResult = UserService.parseAvailability(req.body.availability)
        if (!parsedAvailabilityResult.isSuccessful) {
            return responseUtils.sendErrorMessage(res, parsedAvailabilityResult.message)
        }

        UserService.setAvailability(req.user?.id, parsedAvailabilityResult.data)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while updating the availability.'))
    }

}

export default new UsersController()
