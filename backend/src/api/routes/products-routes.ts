import ProductsController from '../controllers/products-controller'

export const productsRoutes = (app: any) => {
    const router = app.Router()

    router.post('/', ProductsController.create)

    return router
}
