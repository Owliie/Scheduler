import { UserModel } from '../models/user-model'
import { User } from '../data/models'
import { UserRegisterInputModel } from '../models/user-input-models'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    public async register (user: UserRegisterInputModel): Promise<UserModel | null> {
        if (await User.findOne({ email: user.email })) {
            return null
        }

        const salt = await bcrypt.genSalt(10)
        const userToCreate = { ...user }
        userToCreate.password = await bcrypt.hash(user.password, salt)
        const createdUser: UserModel = await User.create(userToCreate)
        return createdUser
    }

    public async login (email: string, password: string) {
        const user: UserModel = await User.findOne({
            email
        })

        if (user && await bcrypt.compare(password, user.password)) {
            const userData = {
                id: user._id,
                email: user.email,
                roles: user.roles
            }

            const accessToken: string = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            return {
                userData: userData,
                accessToken
            }
        } else {
            return null
        }
    }

}

export default new UserService()
