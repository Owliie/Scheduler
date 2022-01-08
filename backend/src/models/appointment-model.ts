import { UserModel } from './user-model'
import { AppointmentStatus } from './enums/appointment-status'

export interface AppointmentModel {
    createdOn: Date;
    client: UserModel;
    businessHolder: UserModel;
    status: AppointmentStatus;
    start: Date;
    end: Date;
    service: string;
}
