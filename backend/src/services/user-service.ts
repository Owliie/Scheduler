import { UserModel } from '../models/user-model'
import { User } from '../data/models'
import { UserRegisterInputModel } from '../models/user-input-models'
import { Repository } from '../data/repositories'
import { TaskResult } from '../common/taskResult'
import { Roles } from '../common'
import { ObjectId } from 'mongodb'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { CompanyColumns, UserColumns } from '../data/models/user-columns'
import { AvailabilityModel } from '../models/availability-model'
import { DAYS_OF_WEEK, TIME_CONSTANTS, WORKING_TIME } from '../common/application-constants'
import { ObjectExtensions } from '../utils/object-extensions'
import { ModelBuilders } from '../utils/model-builders'
import { TimeHelper } from '../utils/time-helper'

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
        const user = await this.usersData.findOne({ email })

        if (user && await bcrypt.compare(password, user.password)) {
            const userData = {
                id: user.id,
                email: user.email,
                roles: user.roles
            }

            const accessToken: string = jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '1h' })

            return {
                userData: {
                    ...userData,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone
                },
                accessToken
            }
        } else {
            return null
        }
    }

    public async getProfileData (userId: string): Promise<any> {
        const projection = QueryArgsHelper.build(
            QueryArgsHelper.disable(UserColumns.password),
            QueryArgsHelper.disable(UserColumns.favourites)
        )
        return this.usersData.getById(userId, projection)
    }

    public async getFavouritesBusinesses (userId: string): Promise<any> {
        const { favourites } = await this.usersData.getById(userId)
        const projection = QueryArgsHelper.build(
            UserColumns.id,
            UserColumns.firstName,
            UserColumns.lastName,
            QueryArgsHelper.combine(UserColumns.company, CompanyColumns.description),
            QueryArgsHelper.combine(UserColumns.company, CompanyColumns.address),
            QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)
        )
        const filter = {
            _id: {
                $in: [...favourites]
            }
        }
        filter[QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)] = {
            $ne: undefined
        }

        const businesses = await this.usersData.filter(filter, projection, {
            populate: QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)
        })
        return businesses
    }

    public async addToFavourites (userId: string, businessId: string): Promise<TaskResult> {
        const user: UserModel = await this.usersData.getById(userId)
        if (!user) {
            return TaskResult.failure('The user does not exist.')
        }
        if (user.favourites.some(id => id.toString() === businessId)) {
            return TaskResult.failure('The passed business is already added to favourites.')
        }
        if (!await this.usersData.exists({
            _id: businessId,
            roles: Roles.businessHolder
        })) {
            return TaskResult.failure('The chosen business is not valid.')
        }

        user.favourites.push(new ObjectId(businessId))
        await this.usersData.update(userId, { favourites: [...user.favourites] })
        return TaskResult.success('Added to favourites.')
    }

    public async removeFromFavourites (userId: string, businessId: string): Promise<TaskResult> {
        const user: UserModel = await this.usersData.getById(userId)
        if (!user) {
            return TaskResult.failure('The user does not exist.')
        }
        if (user.favourites.length === 0 || user.favourites.every(id => id.toString() !== businessId)) {
            return TaskResult.failure('The passed business is not added to favourites.')
        }
        if (!await this.usersData.exists({
            _id: businessId,
            roles: Roles.businessHolder
        })) {
            return TaskResult.failure('The chosen business is not valid.')
        }

        user.favourites = user.favourites.filter(userId => userId.toString() !== businessId)
        await this.usersData.update(userId, { favourites: [...user.favourites] })
        return TaskResult.success('Removed from favourites.')
    }

    public setBusinessType (userId: string, businessType: string): Promise<TaskResult> {
        const updatedFields = {
            [QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)]: businessType
        }

        return this.usersData.update(userId, updatedFields)
            .then(() => TaskResult.success('The user business type is updated.'))
            .catch(() => TaskResult.failure('Error while updating the business type.'))
    }

    public setAvailability (userId: string, availability: AvailabilityModel[]): Promise<TaskResult> {
        const updatedFields = {
            [QueryArgsHelper.combine(UserColumns.company, CompanyColumns.availability)]: availability
        }

        return this.usersData.update(userId, updatedFields)
            .then(() => TaskResult.success('The user availability is updated.'))
            .catch(() => TaskResult.failure('Error while updating the availability.'))
    }

    public buildDefaultAvailability (workingDays: number[]): AvailabilityModel[] {
        return workingDays.map(day => {
            return ModelBuilders.buildAvailability(WORKING_TIME.start, WORKING_TIME.end, day)
        })
    }

    public parseAvailability (availability: any): TaskResult<AvailabilityModel[]> {
        if (!Array.isArray(availability)) {
            return TaskResult.failure('The availability should be array.')
        }

        const parsedAvailability = []
        for (const element of availability) {
            if (!ObjectExtensions.isObject(element)) {
                return TaskResult.failure('Some of the element in the array are not objects.')
            }
            if (!(element.day && element.day >= DAYS_OF_WEEK.Monday && element.day <= DAYS_OF_WEEK.Sunday)) {
                return TaskResult.failure(`Invalid day. The day should be between: ${DAYS_OF_WEEK.Monday} and ${DAYS_OF_WEEK.Sunday}`)
            }
            if (!(element.startHour >= TIME_CONSTANTS.minHour && element.startHour <= TIME_CONSTANTS.maxHour)) {
                return TaskResult.failure(`Invalid start hour. The start hour should be between: ${TIME_CONSTANTS.minHour} and ${TIME_CONSTANTS.maxHour}`)
            }
            if (!(element.startMinute >= TIME_CONSTANTS.minMinute && element.startMinute <= TIME_CONSTANTS.maxMinute)) {
                return TaskResult.failure(`Invalid start minute. The start minute should be between: ${TIME_CONSTANTS.minMinute} and ${TIME_CONSTANTS.maxMinute}`)
            }
            if (!(element.endHour >= TIME_CONSTANTS.minHour && element.endHour <= TIME_CONSTANTS.maxHour)) {
                return TaskResult.failure(`Invalid end hour. The end hour should be between: ${TIME_CONSTANTS.minHour} and ${TIME_CONSTANTS.maxHour}`)
            }
            if (!(element.endMinute >= TIME_CONSTANTS.minMinute && element.endMinute <= TIME_CONSTANTS.maxMinute)) {
                return TaskResult.failure(`Invalid end minute. The end minute should be between: ${TIME_CONSTANTS.minMinute} and ${TIME_CONSTANTS.maxMinute}`)
            }

            const start = {
                hour: element.startHour,
                minute: element.startMinute
            }
            const end = {
                hour: element.endHour,
                minute: element.endMinute
            }

            if (TimeHelper.compare(start, end) >= 0) {
                return TaskResult.failure('Start time cannot be less than or equal to end time')
            }

            parsedAvailability.push(ModelBuilders.buildAvailability(start, end, element.day))
        }

        return TaskResult.success('Availability is valid', parsedAvailability)
    }

}

export default new UserService(new Repository<UserModel>(User))
