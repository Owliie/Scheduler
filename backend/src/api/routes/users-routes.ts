import UsersController from '../controllers/users-controller'

export const usersRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/register', UsersController.register)
    router.post('/login', UsersController.login)

    router.get('/favourites', UsersController.getFavourites)
    router.post('/favourites', UsersController.addToFavourites)
    router.delete('/favourites/:id', UsersController.removeFromFavourites)

    router.get('/profile', UsersController.profile)
    router.post('/profile/businessType', UsersController.setBusinessType)
    router.post('/profile/availability', UsersController.setAvailability)

    return router
}
