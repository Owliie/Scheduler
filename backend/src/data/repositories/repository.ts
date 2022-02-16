import { Model } from 'mongoose'
import { BaseModel } from '../../models/base-model'
import { QueryOptions } from '../../models/common/query-options'

export class Repository<T extends BaseModel> {

    private entity: Model<T>

    public constructor (entity: Model<T>) {
        this.entity = entity
    }

    public getAll (projection: string = '', options: QueryOptions = null): Promise<T[]> {
        let query = this.entity.find()

        query = Repository.applyProjection(query, projection)
        query = Repository.applyQueryOptions(query, options)

        return query.exec()
    }

    public filter (filter: any = {}, projection: string = '', options: QueryOptions = null): Promise<T[]> {
        let query = this.entity.find(filter)

        query = Repository.applyProjection(query, projection)
        query = Repository.applyQueryOptions(query, options)

        return query.exec()
    }

    public getById (id: string, projection: string = '', options: QueryOptions = null): Promise<T> {
        let query = this.entity.findById(id)

        query = Repository.applyProjection(query, projection)
        query = Repository.applyQueryOptions(query, options)

        return query.exec()
    }

    public firstOrDefault (filter: any, projection: string = '', options: QueryOptions = null): Promise<T> {
        let query = this.entity.findOne(filter)

        query = Repository.applyProjection(query, projection)
        query = Repository.applyQueryOptions(query, options)

        return query.exec()
    }

    public update (id: string, updateValue: any): Promise<any> {
        return this.entity.updateOne({ _id: id }, updateValue).exec()
    }

    public exists (filter: any): Promise<boolean> {
        return this.entity.exists(filter)
    }

    public create (model: T): Promise<any> {
        return this.entity.create(model)
    }

    public delete (id: string): any {
        return this.entity.deleteOne({ _id: id })
    }

    private static applyProjection (query: any, projection: string = ''): any {
        if (projection) {
            query = query.select(projection)
        }

        return query
    }

    private static applyQueryOptions (query: any, options: QueryOptions): any {
        if (options && options.populate) {
            query = query.populate({
                path: options.populate
            })
        }
        if (options && options.sort) {
            query = query.sort(options.sort)
        }

        return query
    }

}
