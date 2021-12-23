import { Request, Response } from 'express'
import { UserService } from '../../services'
import { UserRegisterInputModel } from '../../models/user-input-models'

class UsersController {

    public register = async (req: Request, res: Response): Promise<void> => {
        const user: UserRegisterInputModel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email,
            phone: req.body.phone
        }

        const createdUser = await UserService.register(user)
        if (!createdUser) {
            res.status(400).json('User with the same email already exists')
            return
        }

        const {
            accessToken,
            userData
        } = await UserService.login(user.email, user.password)

        res.json({
            token: accessToken,
            email: user.email,
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

}

export default new UsersController()
