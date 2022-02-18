import { AuthenticatedRequest } from '../common/authenticated-request'
import { NextFunction, Response } from 'express'

export const addDevelopmentAuthentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    req.user = {
        id: process.env.DEVELOPER_USER_ID,
        email: process.env.DEVELOPER_EMAIL,
        roles: []
    }

    next()
}
