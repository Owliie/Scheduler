import { Schema, model } from 'mongoose'
import { ProductColumns } from './product-columns'
import { ObjectId } from 'mongodb'
import { ProductModel } from '../../models/product-model'
import { TableNames } from './table-names'

const productSchema = new Schema<ProductModel>({
    [ProductColumns.name]: {
        type: String,
        required: true
    },
    [ProductColumns.price]: {
        type: Number
    },
    [ProductColumns.businessOwner]: {
        type: ObjectId,
        required: true
    },
    [ProductColumns.businessType]: {
        type: ObjectId,
        required: true
    }
})

const Product = model<ProductModel>(TableNames.product, productSchema)

export default Product
