import { QueryArgsHelper } from '../../utils/query-args-helper'
import { UserColumns } from '../../data/models/user-columns'

export const BusinessDetailsProjectionModel = QueryArgsHelper.build(
    UserColumns.id,
    UserColumns.firstName,
    UserColumns.lastName,
    UserColumns.phone,
    QueryArgsHelper.combine(UserColumns.company, UserColumns.description),
    QueryArgsHelper.combine(UserColumns.company, UserColumns.address))
