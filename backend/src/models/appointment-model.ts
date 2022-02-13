import { UserModel } from './user-model'
import { AppointmentStatus } from './enums/appointment-status'
import { BaseModel } from './base-model'

export interface AppointmentModel extends BaseModel {
    createdOn: Date;
    client: UserModel;
    businessHolder: UserModel;
    status: AppointmentStatus;
    start: Date;
    end: Date;
    service: string;
}
