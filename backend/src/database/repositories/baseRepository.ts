import MongoDatabase from '../db-connectors/mongoDatabase'
import to from 'await-to-js'

import { getLoggerFor } from '../../services/logger'

class BaseRepository {

    protected db: any;
    protected collection: string;
    protected noDb: boolean = false;
    private logger = getLoggerFor(this.constructor.name)

    public constructor (collection: string) {
        this.collection = collection

        switch (process.env.DATABASE_TYPE) {
            case 'mongodb': {
                this.db = new MongoDatabase({
                    mongoUri: process.env.MONGODB_URI,
                    collection
                })
                break
            }
            case 'local': {
                break
            }
            case 'none':
            default: {
                this.noDb = true
                this.db = {
                    initialize: async () => { }
                }
            }
        }

        this.db.initialize()
    }

    public async getAll (): Promise<any[]> {
        if (this.noDb) { return [] }

        const [err, data] = await to(this.db.getAll())
        if (err) {
            this.logger.error(`Error when getting getAll ${this.collection}`, err.message)
        }

        return data as any[]
    }

    public async getAllBy (filter: any): Promise<any> {
        if (this.noDb) { return [] }

        const [err, data] = await to(this.db.getAllBy(filter))
        if (err) {
            this.logger.error(`Error when getting getAllBy ${this.collection}`, err)
        }

        return data
    }

    public async getOne (filter: any): Promise<any> {
        if (this.noDb) { return undefined }

        const [err, data] = await to(this.db.getOne(filter))
        if (err) {
            this.logger.error(`Error when getting getOne ${this.collection} with param ${filter}`, err.message)
        }

        return data
    }

    public async getOneById (id: any): Promise<any> {
        if (this.noDb) { return undefined }

        const [err, data] = await to(this.db.getOneById(id))
        if (err) {
            this.logger.error(`Error when getting getOne ${this.collection} with id ${id}`, err.message)
        }

        return data
    }

    public async getByFilter (filter: any, params: any = {}): Promise<any[]> {
        if (this.noDb) { return [] }

        const [err, data] = await to(this.db.getByFilter(filter, params))
        if (err) {
            this.logger.error(`Error when getting getByFilter ${this.collection}`, err.message)
        }

        return data as any[]
    }

    public async batchGet (field: string, batch: any[]): Promise<any> {
        if (this.noDb) { return undefined }

        const [err, data] = await to(this.db.batchGet(field, batch))
        if (err) {
            this.logger.error(`Error when getting batch for collection ${this.collection} `, err.message)
        }

        return data
    }

    public async update (filter: any, document: any) {
        if (this.noDb) { return }

        const [err] = await to(this.db.update(filter, document))
        if (err) {
            this.logger.error(`Error when updating ${this.collection} with param ${document}`, err.message)
        }
    }

    public async updateField (filter: any, field: string, data: any) {
        if (this.noDb) { return }

        const [err] = await to(this.db.updateField(filter, field, data))
        if (err) {
            this.logger.error(`Error when updating ${this.collection} with param ${data}`, err.message)
        }
    }

    public async replaceOne (filter: any, document: any) {
        if (this.noDb) { return }
        return this.db.replaceOne(filter, document)
    }

    public async create (document: any) {
        if (this.noDb) { return }

        const [err] = await to(this.db.create(document))
        if (err) {
            this.logger.error(`Error when creating ${this.collection} with param ${document}`, err.message)
        }
    }

    public async batchCreate (documents: any[]) {
        if (this.noDb) { return }
        if (documents.length > 0) {
            const [err] = await to(this.db.batchCreate(documents))
            if (err) {
                this.logger.error(`Error when creating ${this.collection} with param ${documents}`, err.message)
            }
        }
    }

    public async deleteBy (field: string, value: any) {
        if (this.noDb) { return }

        const [err] = await to(this.db.deleteBy(field, value))
        if (err) {
            this.logger.error(`Error when deleting by ${field} with value of ${value}`, err.message)
        }
    }

    public async deleteOlderThan (searchableField: string, timePoint: number) {
        if (this.noDb) { return }

        const [err] = await to(this.db.deleteOlderThan(searchableField, timePoint))
        if (err) {
            this.logger.error(`Error when deleting older ${this.collection} records then ${timePoint}`, err.message)
        }
    }

    public async upsert (searchFilter: any, document: any) {
        if (this.noDb) { return }

        const [err] = await to(this.db.upsert(searchFilter, document))
        if (err) {
            this.logger.error(`Error when creating ${this.collection} with param ${document}`, err.message)
        }
    }

}

export default BaseRepository
