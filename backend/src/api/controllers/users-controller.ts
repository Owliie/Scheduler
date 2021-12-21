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
        const { userData, accessToken } = await userService.login(email, password)

        res.json({
            token: accessToken,
            username: userData.username,
            email: userData.email,
            id: userData.id
        })
    }

}

export default new UsersController()
