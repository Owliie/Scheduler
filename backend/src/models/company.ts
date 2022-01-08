import { BusinessTypeModel } from './business-type-model'

export interface Company {
    description: string;
    address: string;
    availability: number[];
    businessType: BusinessTypeModel;
}
