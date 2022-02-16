export const DateExtensions = {
    getDate: (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    },
    getDayOfWeek: (date: Date): number => {
        return date.getDay() === 0 ? 7 : date.getDay()
    }
}
