import { body } from 'express-validator'
import { ProductColumns } from '../../data/models/product-columns'

export const ProductValidators = [
    body(ProductColumns.name).isLength({
        min: 2,
        max: 100
    }),
    body(ProductColumns.durationInMinutes).isInt(),
    body(ProductColumns.price).isNumeric()
]
