import { Schema, model } from 'mongoose'
import { AppointmentModel } from '../../models/appointment-model'

const appointmentSchema = new Schema<AppointmentModel>({
    createdOn: { type: Date, required: true },
    client: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    businessHolder: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    service: { type: String, required: true }
})

const Appointment = model<AppointmentModel>('Appointment', appointmentSchema)

export default Appointment
