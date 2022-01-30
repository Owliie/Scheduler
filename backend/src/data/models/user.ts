import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'
import { Company } from '../../models/company'
import { ObjectId } from 'mongodb'

const companySchema = new Schema<Company>({
    description: { type: String, required: true },
    address: { type: String, required: true },
    availability: { type: [Number], required: true },
    businessTypes: { type: [ObjectId], ref: 'BusinessType' }
})

const userSchema = new Schema<UserModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    roles: { type: [String] },
    company: companySchema,
    favourites: { type: [ObjectId], ref: 'User' }
})

const User = model<UserModel>('User', userSchema)

export default User
