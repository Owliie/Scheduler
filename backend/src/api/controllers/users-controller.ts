import { Request, Response } from 'express'
import { UserService } from '../../services/user-service'
import { User } from '../../models'
import { JwtService } from '../../services/jwt-service'

class UsersController {

    public register = async (req: Request, res: Response): Promise<void> => {
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email.body,
            companyName: req.body.companyName
        }

        await UserService.create(user)
        const token: string = JwtService.generateAccessToken(user.username)

        res.json({
            token,
            username: user.username
        })
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        if (await UserService.exists(req.body.username, req.body.password)) {
            const token: string = JwtService.generateAccessToken(req.body.username)

            res.json({
                token,
                username: req.body.username
            })

            return
        }

        res.send('Invalid username or password').status(400)
    }

}

export default new UsersController()
