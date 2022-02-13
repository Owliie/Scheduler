import ProductsController from '../controllers/products-controller'

export const productsRoutes = (app: any) => {
    const router = app.Router()

    router.get('/', ProductsController.allForUser)
    router.post('/', ProductsController.create)
    router.put('/:id', ProductsController.update)
    router.delete('/:id', ProductsController.delete)

    return router
}
