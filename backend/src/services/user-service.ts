import { UserModel } from '../models/user-model'

const User = require('../data/models/user')
const jwt = require('jsonwebtoken')

exports.register = (user: UserModel): Promise<void> => User.create(user)

exports.login = async (email: string, password: string) => {
    const user: UserModel = await User.findOne({
        email,
        password
    })
    console.log(user)
    if (user) {
        const userData = {
            id: user._id,
            email: user.email,
            username: user.username
        }

        const accessToken: string = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })

        return {
            userData: userData,
            accessToken
        }
    } else {
        throw new Error('No such user')
    }
}
