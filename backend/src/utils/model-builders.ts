import { TimeModel } from '../models/common/time-model'
import { AvailabilityModel } from '../models/availability-model'

export const ModelBuilders = {
    buildAvailability: (start: TimeModel, end: TimeModel, day: number): AvailabilityModel => {
        return {
            day,
            startHour: start.hour,
            startMinute: start.minute,
            endHour: end.hour,
            endMinute: end.minute
        }
    }
}
