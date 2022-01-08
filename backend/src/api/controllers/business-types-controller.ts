import { Request, Response } from 'express'

class BusinessTypesController {

    public all = async (req: Request, res: Response): Promise<any> => {
        // TODO: get all the business types from the db
        const response = [
            {
                name: 'Hair Salon',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Nail Salon',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Barbershop',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Hair Salon',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Beauty Salon',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Spa',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Massage',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Eyebrow and Lashes',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Tattoo and Piercing',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Therapy center',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Personal Trainer',
                services: ['Service 1', 'Service 2']
            },
            {
                name: 'Gym and Fitness',
                services: ['Service 1', 'Service 2']
            }
        ]

        return res.json(response)
    }

}

export default new BusinessTypesController()
