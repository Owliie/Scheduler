import * as express from 'express'
import { infoRoutes } from './info-routes'
import { usersRoutes } from './users-routes'
import { businessTypesRoutes } from './business-types-routes'
import { appointmentsRoutes } from './appointments-routes'
import { businessesRoutes } from './businesses-routes'
import { productsRoutes } from './products-routes'

export const registerApiRoutes = (app: any) => {
    const basePrefix = process.env.API_BASE_PREFIX || ''

    app.use(`${basePrefix}/api/info`, infoRoutes(express))
    app.use(`${basePrefix}/api/users`, usersRoutes(express))
    app.use(`${basePrefix}/api/businessTypes`, businessTypesRoutes(express))
    app.use(`${basePrefix}/api/appointments`, appointmentsRoutes(express))
    app.use(`${basePrefix}/api/businesses`, businessesRoutes(express))
    app.use(`${basePrefix}/api/products`, productsRoutes(express))
}
