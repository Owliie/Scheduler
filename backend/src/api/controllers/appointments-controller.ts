import { AuthenticatedRequest } from '../common/authenticated-request'
import { Response } from 'express'
import { AppointmentService, BusinessService, EmailSender } from '../../services'
import { AppointmentStatus } from '../../models/enums/appointment-status'
import { responseUtils } from '../../utils/response-utils.js'
import { AvailabilityModel } from '../../models/availability-model'
import { AppointmentModel } from '../../models/appointment-model'
import { EmailBuilder } from '../../utils/email-builder'

class AppointmentsController {

    public getUpcomingForUser = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        res.json(await AppointmentService.getUpcomingForUser(req.user?.id))
    }

    public create = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const appointment: AppointmentModel = {
            businessHolder: req.body.businessHolder,
            client: req.user?.id,
            start: req.body.start,
            durationInMinutes: req.body.durationInMinutes,
            status: AppointmentStatus.Pending,
            product: req.body.product
        }

        const dayAvailability: AvailabilityModel = await BusinessService
            .getAvailabilityByDay(appointment.businessHolder, new Date(appointment.start))
        if (!dayAvailability) {
            return responseUtils.sendErrorMessage(res, 'The business is not working at the selected date.')
        }

        const validationResult = await AppointmentService.validateAppointment(appointment, dayAvailability)
        if (!validationResult.isSuccessful) {
            return responseUtils.sendErrorMessage(res, validationResult.message)
        }

        AppointmentService.create(appointment)
            .then((result) => {
                responseUtils.processTaskResult(res, result)
            })
            .catch(() => {
                responseUtils.sendErrorMessage(res, 'The appointments cannot be booked.')
            })
    }

    public decline = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const id = req.params.id

        AppointmentService.decline(id)
            .then(async (result) => {
                if (result.isSuccessful) {
                    const appointment = await AppointmentService.details(id)
                    await EmailSender.sendEmail({
                        to: appointment.client.email,
                        subject: EmailBuilder.declinedAppointmentSubject(appointment.businessHolder.company.businessType.name),
                        html: EmailBuilder.declinedAppointmentBody(appointment)
                    })
                }

                responseUtils.processTaskResult(res, result)
            })
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while declining the appointment.'))
    }

    public accept = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const id = req.params.id

        AppointmentService.accept(id)
            .then(async (result) => {
                if (result.isSuccessful) {
                    const appointment = await AppointmentService.details(id)
                    await EmailSender.sendEmail({
                        to: appointment.client.email,
                        subject: EmailBuilder.acceptedAppointmentSubject(appointment.businessHolder.company.businessType.name),
                        html: EmailBuilder.acceptedAppointmentBody(appointment)
                    })
                }

                responseUtils.processTaskResult(res, result)
            })
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while accepting the appointment.'))
    }

}

export default new AppointmentsController()
