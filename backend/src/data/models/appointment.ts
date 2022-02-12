import { Schema, model } from 'mongoose'
import { AppointmentModel } from '../../models/appointment-model'
import { AppointmentColumns } from './appointment-columns'
import { TableNames } from './table-names'

const appointmentSchema = new Schema<AppointmentModel>({
    [AppointmentColumns.createdOn]: { type: Date, required: true },
    [AppointmentColumns.client]: { type: Schema.Types.ObjectId, required: true, ref: TableNames.user },
    [AppointmentColumns.businessHolder]: { type: Schema.Types.ObjectId, required: true, ref: TableNames.user },
    [AppointmentColumns.status]: { type: String, required: true },
    [AppointmentColumns.start]: { type: Date, required: true },
    [AppointmentColumns.end]: { type: Date, required: true },
    [AppointmentColumns.service]: { type: String, required: true }
})

const Appointment = model<AppointmentModel>(TableNames.appointment, appointmentSchema)

export default Appointment
