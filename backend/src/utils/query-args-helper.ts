export const QueryArgsHelper = {
    build: (...args: string[]): string => {
        return args.join(' ')
    },
    combine: (...args: string[]): string => {
        return args.join('.')
    },
    disable: (property: string): string => {
        return '-' + property
    }
}
