import { Model } from 'mongoose'
import { BaseModel } from '../../models/base-model'

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

    public filter (filter: any = {}, projection: string = ''): Promise<T[]> {
        let query = this.entity.find(filter)
        if (projection) {
            query = query.select(projection)
        }

        return query.exec()
    }

    public getById (id: string): Promise<T> {
        return this.entity.findById(id).exec()
    }

    public update (id: string, updateValue: any): Promise<any> {
        return this.entity.updateOne({ id }, updateValue).exec()
    }

    public exists (filter: any): Promise<boolean> {
        return this.entity.exists(filter)
    }

}
