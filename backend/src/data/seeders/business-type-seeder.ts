import { BusinessTypeModel } from '../../models/business-type-model'
import { BusinessType } from '../models'
import { Seeder } from './common/seeder'

export class BusinessTypeSeeder implements Seeder {

    public seed = async (): Promise<any> => {
        const existResults = await Promise.all(this.getData()
            .map(businessType => BusinessType.exists({ name: businessType.name })))
        const businessTypesToAdd = this.getData()
            .filter((_, index) => !existResults[index])

        return BusinessType.insertMany(businessTypesToAdd)
    }

    public getErrorMessage = (err: any): string => {
        return 'Error while seeding the business types\n' + err
    }

    public getSuccessMessage = (): string => {
        return 'The business types were seeded successfully'
    }

    private getData = (): BusinessTypeModel[] => {
        return [
            {
                name: 'Hairdressing',
                imagePath: 'public/images/business-types/hairdressing.jpg'
            },
            {
                name: 'Tattoo',
                imagePath: 'public/images/business-types/tattoo.jpg'
            },
            {
                name: 'Manicure',
                imagePath: 'public/images/business-types/manicure.jpg'
            },
            {
                name: 'Barbershop',
                imagePath: 'public/images/business-types/barbershop.jpg'
            },
            {
                name: 'Massage',
                imagePath: 'public/images/business-types/massage.jpg'
            },
            {
                name: 'Personal Trainer',
                imagePath: 'public/images/business-types/personal-trainer.jpg'
            },
            {
                name: 'Dentist',
                imagePath: 'public/images/business-types/dentist.jpg'
            }
        ]
    }

}
