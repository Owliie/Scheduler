import ProductsController from '../controllers/products-controller'
import { addAuth } from '../middleware/add-authorization'
import { isInRole } from '../middleware/add-role-based-authorization'
import { Roles } from '../../common'
import { addValidation } from '../middleware/add-validate-middleware'
import { ProductValidators } from '../validators/product-validators'

export const productsRoutes = (app: any) => {
    const router = app.Router()

    router.get('/', addAuth, isInRole(Roles.businessHolder), ProductsController.allForUser)
    router.post('/', addAuth, isInRole(Roles.businessHolder), addValidation(ProductValidators), ProductsController.create)
    router.put('/:id', addAuth, isInRole(Roles.businessHolder), addValidation(ProductValidators), ProductsController.update)
    router.delete('/:id', addAuth, isInRole(Roles.businessHolder), ProductsController.delete)

    return router
}
