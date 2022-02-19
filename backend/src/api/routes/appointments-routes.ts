import AppointmentsController from '../controllers/appointments-controller'
import { addAuth } from '../middleware/add-authorization'
import { addValidation } from '../middleware/add-validate-middleware'
import { isInRole } from '../middleware/add-role-based-authorization'
import { Roles } from '../../common'
import { AppointmentValidators } from '../validators/appointment-validators'

export const appointmentsRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/', addAuth, addValidation(AppointmentValidators), AppointmentsController.create)

    router.get('/upcoming', addAuth, AppointmentsController.getUpcomingForUser)

    router.post('/decline/:id', addAuth, isInRole(Roles.businessHolder), AppointmentsController.decline)
    router.post('/accept/:id', addAuth, isInRole(Roles.businessHolder), AppointmentsController.accept)

    router.put('/:id', addAuth, addValidation(AppointmentValidators), AppointmentsController.update)

    return router
}
