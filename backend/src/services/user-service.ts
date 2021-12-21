import { UserModel } from '../models/user-model'

const User = require('../data/models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")

exports.register = async (user: UserModel): Promise<void> => {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await User.create(user)
}

exports.login = async (email: string, password: string) => {
    const user: UserModel = await User.findOne({
        email
    })
    if (user && await bcrypt.compare(password, user.password)) {
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
        return null
    }
}
