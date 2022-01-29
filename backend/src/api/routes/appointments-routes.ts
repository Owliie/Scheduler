import AppointmentsController from '../controllers/appointments-controller'

export const appointmentsRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/upcoming', AppointmentsController.getUpcoming)
    router.get('/pending', AppointmentsController.getPending)

    router.post('/decline', AppointmentsController.decline)
    router.post('/accept', AppointmentsController.accept)

    return router
}
