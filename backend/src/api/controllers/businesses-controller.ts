import { Response } from 'express'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { AppointmentService, BusinessService, ProductService } from '../../services'
import { responseUtils } from '../../utils/response-utils'
import { AvailabilityModel } from '../../models/availability-model'

class BusinessesController {

    public details = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        const id = req.params.id
        const userId = req.user?.id
        res.json(await BusinessService.getById(id, userId))
    }

    public getByType = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const businessTypeId = req.params.id
        const userId = req.user?.id
        res.json(await BusinessService.getByType(businessTypeId, userId))
    }

    public getScheduleByDate = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user?.id
        const date = new Date(req.query.date as string)
        const result = await AppointmentService.getApprovedByBusinessAndDate(userId, date)

        res.json(result)
    }

    public getPendingAppointments = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user?.id
        const result = await AppointmentService.getPendingByBusiness(userId)
        res.json(result)
    }

    public updateBusinessDetails = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const body = {
            description: req.body.description,
            address: req.body.address
        }

        BusinessService.updateBusinessDetails(req.user?.id, body)
            .then((result) => responseUtils.processTaskResult(res, result))
            .catch(() => responseUtils.sendErrorMessage(res, 'Error while updating the business details.'))
    }

    public getFreeSlotsByDay = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const businessId = req.params.id
        const minIntervalLength = (await ProductService.getProductWithMinDuration(businessId))?.durationInMinutes ?? 0
        const date = new Date(req.query.date as string)
        const dayAvailability: AvailabilityModel = await BusinessService.getAvailabilityByDay(businessId, date)

        if (!dayAvailability) {
            return responseUtils.sendErrorMessage(res, 'The business is not working at the selected date.')
        }

        const freeSlots = AppointmentService.getFreeSlotsByDay(
            businessId,
            date,
            minIntervalLength,
            {
                hour: dayAvailability.startHour,
                minute: dayAvailability.startMinute
            },
            {
                hour: dayAvailability.endHour,
                minute: dayAvailability.endMinute
            })
        return res.json(freeSlots)
    }

}

export default new BusinessesController()
