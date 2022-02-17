export interface QueryPopulateOptions {
    path: string;
    select?: string;
    populate?: QueryPopulateOptions;
}
