import { body, ValidationChain } from 'express-validator'
import { UserColumns } from '../../data/models/user-columns'
import { BG_CULTURE } from '../../common/global-constants'

export const RegisterValidators: ValidationChain[] = [
    body(UserColumns.firstName).isLength({
        min: 2,
        max: 50
    }),
    body(UserColumns.lastName).isLength({
        min: 2,
        max: 50
    }),
    body(UserColumns.password).isLength({
        min: 6,
        max: 50
    }),
    body(UserColumns.email).isEmail(),
    body(UserColumns.phone).isMobilePhone(BG_CULTURE)
]
