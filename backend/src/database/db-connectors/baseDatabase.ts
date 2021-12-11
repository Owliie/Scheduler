
export interface DataSourceConfig<TContext> {
    context: TContext;
}

export abstract class BaseDatabase<TContext = any> {

    public initialize?(config: DataSourceConfig<TContext>): void | Promise<void>;
    public getAll?(): void | Promise<any>;
    public getAllBy?(filter: any): void | Promise<any>;
    public getOne?(filter: any): void | Promise<any>;
    public getOneById?(id: any): void | Promise<any>;
    public batchGet?(field: string, batch: any[]): void | Promise<any>;
    public replaceOne?(filter: any, document: any): void | Promise<void>;
    public create?(document: any): void | Promise<void>;
    public upsert?(serachFilter: any, document: any): void | Promise<void>;
    public batchCreate?(documents: any[]): void | Promise<void>;
    public deleteBy?(field: string, value: any): void | Promise<void>;
    public deleteOlderThan?(searchableField: string, timePoint: number): void | Promise<void>;

}
