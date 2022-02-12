import { Response } from 'express'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { AppointmentService, BusinessService } from '../../services'

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
        console.log(result)

        res.json(result)
    }

    public getPendingAppointments = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user?.id
        const result = await AppointmentService.getPendingByBusiness(userId)
        res.json(result)
    }

}

export default new BusinessesController()
