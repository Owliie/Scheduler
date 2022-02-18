import UsersController from '../controllers/users-controller'
import { addValidation } from '../middleware/add-validate-middleware'
import { RegisterValidators } from '../validators/register-validators'

export const usersRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/register', addValidation(RegisterValidators), UsersController.register)
    router.post('/login', UsersController.login)

    router.get('/favourites', UsersController.getFavourites)
    router.post('/favourites', UsersController.addToFavourites)
    router.delete('/favourites/:id', UsersController.removeFromFavourites)

    router.get('/profile', UsersController.profile)
    router.put('/profile', UsersController.updateProfile)
    router.post('/profile/businessType', UsersController.setBusinessType)
    router.post('/profile/availability', UsersController.setAvailability)

    return router
}
