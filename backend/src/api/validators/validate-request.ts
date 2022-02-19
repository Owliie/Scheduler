import { Request } from 'express'
import { ValidationChain, ValidationError, validationResult } from 'express-validator'

export const validateRequest = async (req: Request, validations: ValidationChain[]): Promise<ValidationError[]> => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return null
    }

    return errors.array()
}
