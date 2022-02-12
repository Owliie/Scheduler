import { Schema, model } from 'mongoose'
import { BusinessTypeModel } from '../../models/business-type-model'
import { TableNames } from './table-names'
import { BusinessTypeColumns } from './business-type-columns'

const businessTypeSchema = new Schema<BusinessTypeModel>({
    [BusinessTypeColumns.name]: {
        type: String,
        required: true
    },
    [BusinessTypeColumns.imagePath]: {
        type: String,
        required: true
    }
})

const BusinessType = model<BusinessTypeModel>(TableNames.businessType, businessTypeSchema)

export default BusinessType
