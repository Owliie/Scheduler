import BusinessController from '../controllers/businesses-controller'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/schedule', BusinessController.getScheduleByDate)
    router.get('/pendingAppointments', BusinessController.getPendingAppointments)
    router.get('freeSlots/:id', BusinessController.getFreeSlotsByDay)
    router.get('/byType/:id', BusinessController.getByType)
    router.get('/:id', BusinessController.details)
    router.put('/company', BusinessController.updateBusinessDetails)

    return router
}
