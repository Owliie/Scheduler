import { Request, Response } from 'express'

const userService = require('../../services/user-service')

class UsersController {

    public register = async (req: Request, res: Response): Promise<void> => {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }

        await userService.register(user)
        const { accessToken, userData } = await userService.login(user.email, user.password)

        res.json({
            token: accessToken,
            username: user.username,
            email: user.email,
            id: userData.id
        })
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body
        const loginData = await userService.login(email, password)

        if (!loginData) {
            res.status(400).json('Invalid username or password')
            return
        }

        res.json({
            token: loginData.accessToken,
            username: loginData.userData.username,
            email: loginData.userData.email,
            id: loginData.userData.id
        })
    }

}

export default new UsersController()
