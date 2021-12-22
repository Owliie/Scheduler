import { Schema, model } from 'mongoose'
import { UserModel } from '../../models/user-model'

const userSchema = new Schema<UserModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String] }
})

const User = model<UserModel>('User', userSchema)

export default User
