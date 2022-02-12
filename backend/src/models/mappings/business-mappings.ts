import { UserModel } from '../user-model'

export const BusinessMappings = {
    mapToDetailsModel: (business: UserModel) => {
        return {
            firstName: business.firstName,
            lastName: business.lastName,
            phone: business.phone,
            description: business.company.description,
            address: business.company.address,
            id: business.id
        }
    }
}
