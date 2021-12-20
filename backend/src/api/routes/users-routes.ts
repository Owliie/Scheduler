import UsersController from '../controllers/users-controller'

export const usersRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/register', UsersController.register)
    router.get('/login', UsersController.login)

    return router
}
