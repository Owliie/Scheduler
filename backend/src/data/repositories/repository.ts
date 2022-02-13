import { Model } from 'mongoose'
import { BaseModel } from '../../models/base-model'
import { QueryOptions } from '../../models/common/query-options'

export class Repository<T extends BaseModel> {

    private entity: Model<T>

    public constructor (entity: Model<T>) {
        this.entity = entity
    }

    public getAll (projection: string = ''): Promise<T[]> {
        let query = this.entity.find()
        if (projection) {
            query = query.select(projection)
        }

        return query.exec()
    }

    public filter (filter: any = {}, projection: string = '', options: QueryOptions = undefined): Promise<T[]> {
        let query = this.entity.find(filter)
        if (projection) {
            query = query.select(projection)
        }
        if (options && options.populate) {
            query = query.populate({
                path: options.populate
            })
        }
        if (options && options.sort) {
            query = query.sort(options.sort)
        }

        return query.exec()
    }

    public getById (id: string, projection: string = ''): Promise<T> {
        let query = this.entity.findById(id)
        if (projection) {
            query = query.select(projection)
        }

        return query.exec()
    }

    public update (id: string, updateValue: any): Promise<any> {
        return this.entity.updateOne({ id }, updateValue).exec()
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

}
