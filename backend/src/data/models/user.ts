import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { Company } from '../../models/company'
import { ObjectId } from 'mongodb'
import { AvailabilityColumns, CompanyColumns, UserColumns } from './user-columns'
import { TableNames } from './table-names'
import { AvailabilityModel } from '../../models/availability-model'
import { DAYS_OF_WEEK_ARRAY } from '../../common/application-constants'

const availabilitySchema = new Schema<AvailabilityModel>({
    [AvailabilityColumns.day]: {
        type: Number,
        enum: [...DAYS_OF_WEEK_ARRAY]
    },
    [AvailabilityColumns.startHour]: { type: Number },
    [AvailabilityColumns.startMinute]: { type: Number },
    [AvailabilityColumns.endHour]: { type: Number },
    [AvailabilityColumns.endMinute]: { type: Number }
})

const companySchema = new Schema<Company>({
    [CompanyColumns.description]: {
        type: String,
        required: true
    },
    [CompanyColumns.address]: {
        type: String,
        required: true
    },
    [CompanyColumns.availability]: { type: [availabilitySchema] },
    [CompanyColumns.businessType]: {
        type: ObjectId,
        ref: TableNames.businessType
    }
})

const userSchema = new Schema<UserModel>({
    [UserColumns.firstName]: {
        type: String,
        required: true
    },
    [UserColumns.lastName]: {
        type: String,
        required: true
    },
    [UserColumns.email]: {
        type: String,
        required: true
    },
    [UserColumns.password]: {
        type: String,
        required: true
    },
    [UserColumns.phone]: {
        type: String,
        required: true
    },
    [UserColumns.roles]: { type: [String] },
    [UserColumns.company]: companySchema,
    [UserColumns.favourites]: {
        type: [ObjectId],
        ref: 'User'
    }
})

const User = model<UserModel>(TableNames.user, userSchema)

export default User
