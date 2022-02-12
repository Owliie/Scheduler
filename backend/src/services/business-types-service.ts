import { Repository } from '../data/repositories'
import { BusinessTypeModel } from '../models/business-type-model'
import { BusinessType } from '../data/models'

class BusinessTypesService {

    private businessTypesData: Repository<BusinessTypeModel>

    public constructor (businessTypesData: Repository<BusinessTypeModel>) {
        this.businessTypesData = businessTypesData
    }

    public async all (): Promise<any[]> {
        return this.businessTypesData.getAll()
    }

}

export default new BusinessTypesService(new Repository<BusinessTypeModel>(BusinessType))
