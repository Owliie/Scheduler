import * as express from 'express'
import { infoRoutes } from './info-routes'

export const registerApiRoutes = (app: any) => {
    const basePrefix = process.env.API_BASE_PREFIX || ''

    // Example usage
    app.use(`${basePrefix}/api/info`, infoRoutes(express))
}
