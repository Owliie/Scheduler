import { ObjectId } from 'mongodb'

export interface Company {
    description: string;
    address: string;
    availability: number[];
    businessType?: string | ObjectId;
}
