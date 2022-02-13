import { ObjectId } from 'mongodb'

export interface ProductModel {
    name: string;
    price: number;
    businessOwner: ObjectId;
    businessType: ObjectId;
}
