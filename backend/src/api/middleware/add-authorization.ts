import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../common/authenticated-request'
import { responseUtils } from '../../utils/response-utils'

const jwt = require('jsonwebtoken')

export const addAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return responseUtils.sendUnauthorizedError(res, 'You are not authorized.')
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403).json('Invalid access token')
        }

        req.user = { ...user }

        next()
    })
}
