import { Repository } from '../data/repositories'
import { UserModel } from '../models/user-model'
import { Roles } from '../common'
import { User } from '../data/models'
import { CompanyColumns, UserColumns } from '../data/models/user-columns'
import { QueryArgsHelper } from '../utils/query-args-helper'
import { BusinessDetailsProjectionModel } from '../models/projection/business-projection-models'
import { BusinessMappings } from '../models/mappings/business-mappings'

class BusinessService {

    private usersData: Repository<UserModel>

    public constructor (usersData: Repository<UserModel>) {
        this.usersData = usersData
    }

    public async getById (id: string, userId: string): Promise<any> {
        const business = await this.usersData.getById(id, BusinessDetailsProjectionModel)
        const { favourites } = await this.usersData.getById(userId, UserColumns.favourites)
        return {
            ...BusinessMappings.mapToDetailsModel(business),
            addedToFavourites: favourites.map(f => f.toString()).includes(id)
        }
    }

    public async getByType (businessTypeId: string, userId: string): Promise<any> {
        const filter = {
            [UserColumns.roles]: Roles.businessHolder,
            [QueryArgsHelper.combine(UserColumns.company, CompanyColumns.businessType)]: businessTypeId
        }

        const businesses = await this.usersData.filter(filter, BusinessDetailsProjectionModel)
        const { favourites } = await this.usersData.getById(userId, UserColumns.favourites)
        const favouritesSet = new Set<string>(favourites.map(f => f.toString()))
        return businesses.map(b => {
            return {
                ...BusinessMappings.mapToDetailsModel(b),
                addedToFavourites: favouritesSet.has(b.id.toString())
            }
        })
    }

}

export default new BusinessService(new Repository<UserModel>(User))
