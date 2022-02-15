import { ObjectId } from 'mongodb'
import { AvailabilityModel } from './availability-model'

export interface Company {
    description: string;
    address: string;
    availability: AvailabilityModel[];
    businessType?: string | ObjectId;
}
