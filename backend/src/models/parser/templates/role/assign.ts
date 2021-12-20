export const Assign = {
    required: [
        'email',
        'roles'
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
