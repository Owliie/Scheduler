import { BaseModel } from './base-model'

export interface UserModel extends BaseModel {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}
