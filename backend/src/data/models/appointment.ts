import { Schema, model } from 'mongoose'
import { AppointmentModel } from '../../models/appointment-model'
import { AppointmentColumns } from './appointment-columns'
import { TableNames } from './table-names'
import { ObjectId } from 'mongodb'

const appointmentSchema = new Schema<AppointmentModel>({
    [AppointmentColumns.createdOn]: { type: Date, required: true, default: Date.now() },
    [AppointmentColumns.client]: { type: Schema.Types.ObjectId, required: true, ref: TableNames.user },
    [AppointmentColumns.businessHolder]: { type: Schema.Types.ObjectId, required: true, ref: TableNames.user },
    [AppointmentColumns.status]: { type: String, required: true },
    [AppointmentColumns.start]: { type: Date, required: true },
    [AppointmentColumns.durationInMinutes]: { type: Number, required: true },
    [AppointmentColumns.product]: { type: ObjectId, required: true, ref: TableNames.product }
})

const Appointment = model<AppointmentModel>(TableNames.appointment, appointmentSchema)

export default Appointment
