import { AuthenticatedRequest } from '../common/authenticated-request'
import { Response } from 'express'
import { AppointmentService } from '../../services'
import { AppointmentStatus } from '../../models/enums/appointment-status'
import { responseUtils } from '../../utils/response-utils.js'

class AppointmentsController {

    public getUpcomingForUser = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        // const userId = req.user.id
        // TODO: get all the upcoming appointments from the db
        const response = [
            {
                id: '3c9ef89f-d9b0-43c6-9aae-99102281884e',
                createdOn: '2022-01-08 15:15:25.000',
                businessHolder: {
                    firstName: 'Atanas',
                    lastName: 'Vasilev',
                    phone: '0874588965',
                    email: 'nasko.it@scheduler.com',
                    address: 'Studentki grad, Atanas Ishirkov 12'
                },
                start: '2022-01-15 15:30:00.000',
                durationInMinutes: '2022-01-15 16:00:25.000',
                product: 'Short men cutting'
            }
        ]

        res.json(response)
    }

    public getPendingForUser = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        // const userId = req.user.id
        // TODO: get all the pending appointments created in the last n days
        const response = [
            {
                id: '3c9ef89f-d9b0-43c6-9aae-99102281884e',
                createdOn: '2022-01-08 15:15:25.000',
                businessHolder: {
                    firstName: 'Atanas',
                    lastName: 'Vasilev',
                    phone: '0874588965',
                    email: 'nasko.it@scheduler.com',
                    address: 'Studentki grad, Stefan Mladenov 14'
                },
                start: '2022-01-15 15:30:00.000',
                durationInMinutes: '2022-01-15 16:00:25.000',
                product: 'Short men cutting'
            }
        ]

        res.json(response)
    }

    public create = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const appointment = {
            businessHolder: req.body.businessHolder,
            client: req.user?.id,
            start: req.body.start,
            end: req.body.end,
            status: AppointmentStatus.Pending,
            service: req.body.service
        }

        // TODO: validate that the appointment start and end  are correct
        console.log(appointment)

        AppointmentService.create(appointment)
            .then(() => {
                responseUtils.sendSuccessMessage(res, 'Appointment created successfully.')
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'The appointments cannot be booked.')
            })
    }

    public decline = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const id = req.params.id

        AppointmentService.decline(id)
            .then(() => {
                responseUtils.sendSuccessMessage(res, 'The appointment is successfully declined.')
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'Error while declining the appointment.')
            })
    }

    public accept = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const id = req.params.id

        AppointmentService.accept(id)
            .then(() => {
                responseUtils.sendSuccessMessage(res, 'The appointment is approved.')
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'Error while accepting the appointment.')
            })
    }

}

export default new AppointmentsController()
