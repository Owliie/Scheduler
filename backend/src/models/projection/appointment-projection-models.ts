import { QueryArgsHelper } from '../../utils/query-args-helper'
import { AppointmentColumns } from '../../data/models/appointment-columns'
import { CompanyColumns, UserColumns } from '../../data/models/user-columns'
import { ProductColumns } from '../../data/models/product-columns'

export const AppointmentDetailsForUserProjectionModel = QueryArgsHelper.build(
    AppointmentColumns.createdOn,
    AppointmentColumns.status,
    AppointmentColumns.start,
    AppointmentColumns.durationInMinutes
)

export const AppointmentDetailsForUserPopulate = [
    {
        path: AppointmentColumns.businessHolder,
        select: QueryArgsHelper.build(
            UserColumns.firstName,
            UserColumns.lastName,
            UserColumns.email,
            UserColumns.phone,
            QueryArgsHelper.combine(UserColumns.company, CompanyColumns.description),
            QueryArgsHelper.combine(UserColumns.company, CompanyColumns.address)
        ),
        populate: {
            path: QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)
        }
    },
    {
        path: AppointmentColumns.product,
        select: QueryArgsHelper.build(
            ProductColumns.name,
            ProductColumns.price
        )
    }
]
