import { Request, Response, NextFunction } from 'express'
import { ValidationChain } from 'express-validator'
import { responseUtils } from '../../utils/response-utils'
import { validateRequest } from '../validators/validate-request'

export const addValidation = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const errors = await validateRequest(req, validations)
        if (errors) {
            return responseUtils.sendValidationError(res, errors)
        }

        next()
    }
}
