import { AuthenticatedRequest } from '../common/authenticated-request'
import { Response } from 'express'

class AppointmentsController {

    public getUpcoming = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        // const userId = req.user.id
        // TODO: get all the upcoming appointments from the db
        const response = [
            {
                createdOn: '2022-01-08 15:15:25.000',
                businessHolder: {
                    firstName: 'Atanas',
                    lastName: 'Vasilev',
                    phone: '0874588965',
                    email: 'nasko.it@scheduler.com'
                },
                start: '2022-01-15 15:30:00.000',
                end: '2022-01-15 16:00:25.000',
                service: 'Short men cutting'
            }
        ]

        res.json(response)
    }

    public getPending = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
        // const userId = req.user.id
        // TODO: get all the pending appointments created in the last n days
        const response = [
            {
                createdOn: '2022-01-08 15:15:25.000',
                businessHolder: {
                    firstName: 'Atanas',
                    lastName: 'Vasilev',
                    phone: '0874588965',
                    email: 'nasko.it@scheduler.com'
                },
                start: '2022-01-15 15:30:00.000',
                end: '2022-01-15 16:00:25.000',
                service: 'Short men cutting'
            }
        ]

        res.json(response)
    }

}

export default new AppointmentsController()
