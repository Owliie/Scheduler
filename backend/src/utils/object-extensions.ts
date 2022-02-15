export const ObjectExtensions = {
    isObject: (element: any): boolean => {
        return (typeof element === 'object' && !Array.isArray(element) && element !== null)
    }
}
