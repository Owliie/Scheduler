import { BaseModel } from './base-model'
import { Company } from './company'
import { ObjectId } from 'mongodb'

export interface UserModel extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    roles: string[];
    company?: Company;
    favourites: ObjectId[];
}
