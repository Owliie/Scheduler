import UsersController from '../controllers/users-controller'
import { addValidation } from '../middleware/add-validate-middleware'
import { RegisterValidators } from '../validators/register-validators'
import { addAuth } from '../middleware/add-authorization'
import { isInRole } from '../middleware/add-role-based-authorization'
import { Roles } from '../../common'

export const usersRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.post('/register', addValidation(RegisterValidators), UsersController.register)
    router.post('/login', UsersController.login)

    router.get('/favourites', addAuth, UsersController.getFavourites)
    router.post('/favourites', addAuth, UsersController.addToFavourites)
    router.delete('/favourites/:id', addAuth, UsersController.removeFromFavourites)

    router.get('/profile', addAuth, UsersController.profile)
    router.put('/profile', addAuth, UsersController.updateProfile)
    router.post('/profile/businessType', addAuth, isInRole(Roles.businessHolder), UsersController.setBusinessType)
    router.post('/profile/availability', addAuth, isInRole(Roles.businessHolder), UsersController.setAvailability)

    return router
}
