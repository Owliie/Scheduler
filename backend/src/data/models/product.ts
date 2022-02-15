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
    [ProductColumns.durationInMinutes]: {
        type: Number
    },
    [ProductColumns.businessOwner]: {
        type: ObjectId,
        ref: TableNames.user,
        required: true
    }
})

const Product = model<ProductModel>(TableNames.product, productSchema)

export default Product
