import { AvailabilityModel } from '../models/availability-model'
import { TimeModel } from '../models/common/time-model'

export const ModelHelpers = {
    getAvailabilityStart: (availability: AvailabilityModel): TimeModel => {
        return {
            hour: availability.startHour,
            minute: availability.startMinute
        }
    },
    getAvailabilityEnd: (availability: AvailabilityModel): TimeModel => {
        return {
            hour: availability.endHour,
            minute: availability.endMinute
        }
    }
}
