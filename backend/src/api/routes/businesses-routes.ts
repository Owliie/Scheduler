import BusinessController from '../controllers/businesses-controller'
import { addAuth } from '../middleware/add-authorization'
import { isInRole } from '../middleware/add-role-based-authorization'
import { Roles } from '../../common'
import { addValidation } from '../middleware/add-validate-middleware'
import { CompanyValidators } from '../validators/company-validators'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/schedule', addAuth, isInRole(Roles.businessHolder), BusinessController.getScheduleByDate)
    router.get('/freeSlots/:id', addAuth, BusinessController.getFreeSlotsByDay)
    router.get('/byType/:id', addAuth, BusinessController.getByType)
    router.put('/company', addAuth, isInRole(Roles.businessHolder), addValidation(CompanyValidators), BusinessController.updateBusinessDetails)
    router.get('/products/:businessId', addAuth, BusinessController.getProducts)
    router.get('/:id', addAuth, BusinessController.details)

    return router
}
