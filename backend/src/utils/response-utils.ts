import { Response } from 'express'
import { OperationStatus } from '../models/enums/operation-status'
import { ENVIRONMENT_VARIABLES_VALUES, HTTP_STATUS_CODES } from '../common/global-constants'
import { TaskResult } from '../common/taskResult'
import { ValidationError } from 'express-validator'

export const responseUtils = {
    sendSuccessMessage: (res: Response, message: string, data: any = {}): void => {
        res.json({
            message,
            status: OperationStatus.Success,
            data
        })
    },
    sendErrorMessage: (res: Response, message: string, data: any = {}): void => {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                message,
                status: OperationStatus.Failure,
                data: process.env.NODE_ENV === ENVIRONMENT_VARIABLES_VALUES.development ? data : {}
            })
    },
    sendValidationError: (res: Response, errors: ValidationError[]): void => {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                message: 'Some of the fields are invalid.',
                status: OperationStatus.ValidationError,
                data: errors
            })
    },
    processTaskResult (res: Response, result: TaskResult): void {
        if (result.isSuccessful) {
            return this.sendSuccessMessage(res, result.message, result.data)
        }

        this.sendErrorMessage(res, result.message, result.data)
    },
    sendUnauthorizedError: (res: Response, error: string): void => {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                message: error,
                status: OperationStatus.Unauthorized,
                data: null
            })
    }
}
