import { NextFunction, Response } from 'express'
import { AuthenticatedRequest } from '../common/authenticated-request'

const jwt = require('jsonwebtoken')

export const addAuthentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401).json('You are not authorized')
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403).json('Invalid access token')
        }

        req.user = user

        next()
    })
}
