import UsersController from '../controllers/users-controller'

export const usersRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/register', UsersController.register)
    router.post('/login', UsersController.login)

    router.get('/favourites', UsersController.getFavourites)

    return router
}
