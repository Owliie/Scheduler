import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { Company } from '../../models/company'
import { ObjectId } from 'mongodb'
import { CompanyColumns, UserColumns } from './user-columns'
import { TableNames } from './table-names'

const companySchema = new Schema<Company>({
    [CompanyColumns.description]: { type: String, required: true },
    [CompanyColumns.address]: { type: String, required: true },
    [CompanyColumns.availability]: { type: [Number], required: true },
    [CompanyColumns.businessTypes]: { type: [ObjectId], ref: TableNames.businessType }
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
