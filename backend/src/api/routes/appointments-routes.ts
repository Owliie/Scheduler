import AppointmentsController from '../controllers/appointments-controller'

export const appointmentsRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/', AppointmentsController.create)

    router.get('/upcoming', AppointmentsController.getUpcomingForUser)

    router.post('/decline/:id', AppointmentsController.decline)
    router.post('/accept/:id', AppointmentsController.accept)

    return router
}
