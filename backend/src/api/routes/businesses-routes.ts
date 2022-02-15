import BusinessController from '../controllers/businesses-controller'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()
    router.get('/schedule', BusinessController.getScheduleByDate)
    router.get('/pendingAppointments', BusinessController.getPendingAppointments)
    router.get('/byType/:id', BusinessController.getByType)
    router.get('/:id', BusinessController.details)

    return router
}
