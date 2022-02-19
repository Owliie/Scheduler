import { AuthenticatedRequest } from '../common/authenticated-request'
import { NextFunction, Response } from 'express'
import { responseUtils } from '../../utils/response-utils'

export const isInRole = (role: string) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
            return responseUtils.sendUnauthorizedError(res, `You are not in role: ${role}`)
        }

        next()
    }
}
