import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { Company } from '../../models/company'
import { ObjectId } from 'mongodb'
import { UserColumns } from './user-columns'
import { TableNames } from './table-names'

const companySchema = new Schema<Company>({
    [UserColumns.description]: { type: String, required: true },
    [UserColumns.address]: { type: String, required: true },
    [UserColumns.availability]: { type: [Number], required: true },
    [UserColumns.businessTypes]: { type: [ObjectId], ref: 'BusinessType' }
})

const userSchema = new Schema<UserModel>({
    [UserColumns.firstName]: { type: String, required: true },
    [UserColumns.lastName]: { type: String, required: true },
    [UserColumns.email]: { type: String, required: true },
    [UserColumns.password]: { type: String, required: true },
    [UserColumns.phone]: { type: String, required: true },
    [UserColumns.roles]: { type: [String] },
    [UserColumns.company]: companySchema,
    [UserColumns.favourites]: { type: [ObjectId], ref: 'User' }
})

const User = model<UserModel>(TableNames.user, userSchema)

export default User
