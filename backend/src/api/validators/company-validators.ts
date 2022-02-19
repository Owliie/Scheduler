import { body, ValidationChain } from 'express-validator'
import { CompanyColumns } from '../../data/models/user-columns'

export const CompanyDetailsValidators: ValidationChain[] = [
    body(CompanyColumns.address).isLength({
        min: 3,
        max: 1000
    }),
    body(CompanyColumns.description).isLength({
        min: 3,
        max: 2000
    })
]

export const CompanyValidators: ValidationChain[] = [
    ...CompanyDetailsValidators,
    body(CompanyColumns.availability).isArray({
        min: 1,
        max: 7
    })
]
