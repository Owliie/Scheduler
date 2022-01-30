import { Response } from 'express'
import { OperationStatus } from '../models/enums/operation-status'
import { HTTP_STATUS_CODES } from '../common/global-constants'

export const responseUtils = {
    sendSuccessMessage: (res: Response, message: string): void => {
        res.json({
            message,
            status: OperationStatus.Success
        })
    },
    sendErrorMessage: (res: Response, message: string): void => {
        res.status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                message,
                status: OperationStatus.Failure
            })
    }
}
