import BusinessController from '../controllers/businesses-controller'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/schedule', BusinessController.getScheduleByDate)
    router.get('/freeSlots/:id', BusinessController.getFreeSlotsByDay)
    router.get('/byType/:id', BusinessController.getByType)
    router.put('/company', BusinessController.updateBusinessDetails)
    router.get('/products/:businessId', BusinessController.getProducts)
    router.get('/:id', BusinessController.details)

    return router
}
