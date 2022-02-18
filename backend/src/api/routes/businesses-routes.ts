import BusinessController from '../controllers/businesses-controller'
import { addAuth } from '../middleware/add-authorization'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/schedule', BusinessController.getScheduleByDate)
    router.get('/freeSlots/:id', BusinessController.getFreeSlotsByDay)
    router.get('/byType/:id', addAuth, BusinessController.getByType)
    router.put('/company', BusinessController.updateBusinessDetails)
    router.get('/products/:businessId', BusinessController.getProducts)
    router.get('/:id', BusinessController.details)

    return router
}
