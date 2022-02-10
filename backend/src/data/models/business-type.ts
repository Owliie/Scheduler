import { Schema, model } from 'mongoose'
import { BusinessTypeModel } from '../../models/business-type-model'

const businessTypeSchema = new Schema<BusinessTypeModel>({
    name: { type: String, required: true },
    imagePath: { type: String, required: true }
})

const BusinessType = model<BusinessTypeModel>('BusinessType', businessTypeSchema)

export default BusinessType
