import { BaseDatabase } from './baseDatabase'
import { MongoClient } from 'mongodb'
var ObjectId = require('mongodb').ObjectId
import { getLoggerFor } from '../../services/logger'

class MongoDatabase implements BaseDatabase {

    private collection: string = '';
    private mongoUri: string = '';
    protected db: any;
    private logger = getLoggerFor(this.constructor.name)
    private connectionEstablished = false

    public constructor (settings: any) {
        this.collection = settings.collection
        this.mongoUri = settings.mongoUri
    }

    private hasConnection () {
        return this.db && this.db.s && this.db.s.topology.isConnected()
    }

    public async initialize () {
        if (!this.hasConnection()) {
            try {
                this.logger.info(`Trying to  ${!this.connectionEstablished ? 'Connect' : 'ReConnect'} ${this.collection}`)
                const client = await MongoClient.connect(this.mongoUri, { useNewUrlParser: true })
                const db = client.db()
                this.db = db.collection(this.collection)
                this.connectionEstablished = true

                this.logger.info(`Mongo Connection status ${this.collection} ${this.db.s.topology.isConnected()}`)
            } catch (err) {
                this.logger.error(`Mongo error ${this.collection}`, err.message)
            }
        }
    }

    public async getAll () {
        await this.initialize()
        return this.db.find().toArray()
    }

    public async getAllBy (filter: any) {
        await this.initialize()
        return this.db.find(filter).toArray()
    }

    public async getOne (filter: any) {
        await this.initialize()
        return this.db.findOne(filter)
    }

    public async getOneById (id: any) {
        await this.initialize()
        return this.db.findOne({ _id: new ObjectId(id) })
    }

    public async getByFilter (filter: any, params: any = {}) {
        await this.initialize()
        return this.db.find(filter)
            .sort(params.sort || { _id: -1 })
            .skip(params.skip || 0)
            .limit(params.limit || 100).toArray()
    }

    public async batchGet (field: string, batch: any[]) {
        await this.initialize()
        return this.db.find({ [field]: { $in: batch } }).toArray()
    }

    public async update (filter: any, document: any) {
        await this.initialize()
        if (filter._id != null) {
            filter._id = ObjectId(filter._id)
        }
        delete document._id
        return this.db.updateOne(filter, { $set: document })
    }

    public async updateField (filter: any, field: string, data: any) {
        await this.initialize()
        const update = {}
        update[field] = data
        if (filter._id != null) {
            filter._id = ObjectId(filter._id)
        }
        return this.db.updateOne(filter, {
            $set: update
        })
    }

    public async replaceOne (filter: any, document: any) {
        await this.initialize()
        return this.db.findOneAndReplace(filter, document, { upsert: true })
    }

    public async create (document: any) {
        await this.initialize()
        return this.db.insert(document)
    }

    public async batchCreate (documents: any[]) {
        await this.initialize()
        return this.db.insertMany(documents)
    }

    public async deleteBy (field: string, value: any) {
        await this.initialize()
        return this.db.deleteOne({ [field]: value })
    }

    public async deleteOlderThan (searchableField: string, timePoint: number) {
        await this.initialize()
        return this.db.deleteMany({ [searchableField]: { $lt: timePoint } })
    }

    public async upsert (searchFilter: any, document: any) {
        await this.initialize()
        return this.db.updateOne({ [searchFilter]: document[searchFilter] }, { $set: document }, {
            upsert: true
        })
    }

}

export default MongoDatabase
