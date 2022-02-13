import { ObjectId } from 'mongodb'
import { BaseModel } from './base-model'

export interface ProductModel extends BaseModel{
    name: string;
    price: number;
    durationInMinutes: number;
    businessOwner: ObjectId | string;
    businessType: ObjectId | string;
}
