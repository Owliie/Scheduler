import { BaseModel } from './base-model'
import { Company } from './company'

export interface UserModel extends BaseModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    roles: string[];
    company?: Company;
}
