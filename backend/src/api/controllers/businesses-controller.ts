import { Response, Request } from 'express'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { AppointmentService, BusinessService } from '../../services'

class BusinessesController {

    public details = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id
        res.json(await BusinessService.getById(id))
    }

    public getByType = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const businessTypeId = +req.params.id
        const userId = req.user.id
        res.json(await BusinessService.getByType(businessTypeId, userId))
    }

    public getScheduleByDay = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user.id
        const date = new Date(req.query.date as string)

        res.json(await AppointmentService.getApprovedByBusinessAndDate(userId, date))
    }

    public getPendingAppointments = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        const userId = req.user.id

        res.json(await AppointmentService.getPendingByBusiness(userId))
    }

}

export default new BusinessesController()
