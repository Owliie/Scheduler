import { TimeModel } from '../models/common/time-model'

export const TimeHelper = {
    compare: (first: TimeModel, second: TimeModel): number => {
        if (first.hour > second.hour) {
            return 1
        }
        if (first.hour < second.hour) {
            return -1
        }
        if (first.minute > second.minute) {
            return 1
        }
        if (first.minute < second.minute) {
            return -1
        }

        return 0
    },
    getTime: (date: Date): TimeModel => {
        return {
            hour: date.getHours(),
            minute: date.getMinutes()
        }
    },
    calculateIntervalLength: (start: TimeModel, end: TimeModel): number => {
        if (TimeHelper.compare(start, end) > 0) {
            return -1
        }

        return (end.hour - start.hour) * 60 + (end.minute - start.minute)
    },
    addMinutes: (time: TimeModel, minutes: number): TimeModel => {
        const totalMinutes = time.minute + minutes
        return {
            hour: time.hour + Math.floor(totalMinutes / 60),
            minute: totalMinutes % 60
        }
    }
}
