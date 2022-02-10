import { Model } from 'mongoose'
import { BaseModel } from '../../models/base-model'
import { ObjectID } from 'mongodb'

export class Repository<T extends BaseModel> {

    private entity: Model<T>

    public constructor (entity: Model<T>) {
        this.entity = entity
    }

    public getAll (projection: string = ''): Promise<BaseModel[]> {
        let query = this.entity.find()
        if (projection) {
            query = query.select(projection)
        }

        return query.exec()
    }

    public filter (filter: any = {}, projection: string = ''): Promise<BaseModel[]> {
        let query = this.entity.find(filter)
        if (projection) {
            query = query.select(projection)
        }

        return query.exec()
    }

    public getById (id: ObjectID): Promise<BaseModel> {
        return this.entity.findById(id).exec()
    }

}
