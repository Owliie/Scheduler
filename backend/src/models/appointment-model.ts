import { AppointmentStatus } from './enums/appointment-status'
import { BaseModel } from './base-model'
import { ObjectId } from 'mongodb'

export interface AppointmentModel extends BaseModel {
    createdOn: Date;
    client: string | ObjectId;
    businessHolder: string | ObjectId;
    status: AppointmentStatus;
    start: Date;
    durationInMinutes: number;
    product: string | ObjectId;
}
