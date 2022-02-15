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
    }
}
