import { QueryPopulateOptions } from './query-populate-options'

export interface QueryOptions {
    populate?: string;
    sort?: any;
    complexPopulate?: QueryPopulateOptions[];
}
