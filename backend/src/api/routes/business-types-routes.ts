import BusinessTypesController from '../controllers/business-types-controller'

export const businessTypesRoutes = (expressApp: any) => {
    const router = expressApp.Router()

    router.get('/', BusinessTypesController.all)

    return router
}
