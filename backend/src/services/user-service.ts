import { UserModel } from '../models/user-model'
import { User } from '../data/models'
import { UserRegisterInputModel } from '../models/user-input-models'
import { Repository } from '../data/repositories'
import { TaskResult } from '../common/taskResult'
import { Roles } from '../common'

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserService {

    private usersData: Repository<UserModel>

    public constructor (usersData: Repository<UserModel>) {
        this.usersData = usersData
    }

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
                id: user.id,
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

    public async addToFavourites (userId: string, businessId: string): Promise<TaskResult> {
        const user: UserModel = await this.usersData.getById(userId)
        if (!user) {
            return TaskResult.failure('The user does not exist.')
        }
        if (user.favourites.includes(businessId)) {
            return TaskResult.failure('The passed business is already added to favourites.')
        }
        if (!await this.usersData.exists({ _id: businessId, roles: Roles.businessHolder })) {
            return TaskResult.failure('The chosen business is not valid.')
        }

        user.favourites.push(businessId)
        await this.usersData.update(userId, { favourites: [...user.favourites] })
        return TaskResult.success('Added to favourites.')
    }

    public async removeFromFavourites (userId: string, businessId: string): Promise<void> {
        // TODO remove the business to user favourites
    }

}

export default new UserService(new Repository<UserModel>(User))
