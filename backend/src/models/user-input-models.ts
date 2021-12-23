import { Company } from './company'

export interface UserRegisterInputModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: Company;
    roles?: string[];
}
