export const DateExtensions = {
    getDate: (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate())
    },
    nextDate: (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
    },
    getDayOfWeek: (date: Date): number => {
        return date.getDay() === 0 ? 7 : date.getDay()
    },
    format: (date: Date): string => {
        const dateAsString = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
            .map((part, i) => part.toString().padStart(i === 2 ? 4 : 2, '0'))
            .join('/')
        const timeAsString = [date.getHours(), date.getMinutes()]
            .map(part => part.toString().padStart(2, '0'))
            .join('0')
        return dateAsString + ' ' + timeAsString
    }
}
