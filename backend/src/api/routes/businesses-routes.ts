import BusinessController from '../controllers/businesses-controller'

export const businessesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/{id}', BusinessController.details)

    router.get('/byType/{id}', BusinessController.getByType)

    router.get('/schedule', BusinessController.getScheduleByDay)
    router.get('/pendingAppointments', BusinessController.getPendingAppointments)

    return router
}
