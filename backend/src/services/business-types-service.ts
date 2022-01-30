const businessTypes = [
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022818845',
        name: 'Hair Salon',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9ef89f-d9b0-43c6-9aae-991022еr884c',
        name: 'Nail Salon',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6456889f-d9b0-43c6-9aae-99102281884c',
        name: 'Barbershop',
        services: ['Service 1', 'Service 2']
    },
    {
        id: 'er9ef89f-d9b0-43c6-9aae-99102281884c',
        name: 'Hair Salon',
        services: ['Service 1', 'Service 2']
    },
    {
        name: 'Beauty Salon',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9eferf-d9b0-43c6-9aae-99102281884c',
        name: 'Spa',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9ef879-d9b0-43c6-9aae-99102281884c',
        name: 'Massage',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9ef88g-d9b0-43c6-9aae-99102281884c',
        name: 'Eyebrow and Lashes',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9ef89f-d9b0-78c6-9aae-99102281884c',
        name: 'Tattoo and Piercing',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9ef89f-dfgg-43c6-9aae-99102281884c',
        name: 'Therapy center',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9df89f-d9b0-43c6-9aae-99102281884c',
        name: 'Personal Trainer',
        services: ['Service 1', 'Service 2']
    },
    {
        id: '6c9dfff-d9b0-43c6-9aae-99102281884c',
        name: 'Gym and Fitness',
        services: ['Service 1', 'Service 2']
    }
]

class BusinessTypesService {

    public async all (): Promise<any[]> {
        return Promise.resolve(businessTypes.map(b => {
            return {
                id: b.id,
                name: b.name
            }
        }))
    }

}

export default new BusinessTypesService()
