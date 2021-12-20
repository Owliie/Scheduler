export const Access = {
    required: [
        'roles',
        'permission'
    ],
    subTemplates: {
        roles: {
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
