export const Create = {
    required: [
        'label',
        'roles',
        'permissions'
    ],
    subTemplates: {
        roles: {
            type: 'array',
            // @ts-ignore
            required: [],
            // @ts-ignore
            optional: []
        },
        permissions: {
            type: 'array',
            // @ts-ignore
            required: [],
            // @ts-ignore
            optional: []
        }
    },
    // @ts-ignore
    optional: []
}
