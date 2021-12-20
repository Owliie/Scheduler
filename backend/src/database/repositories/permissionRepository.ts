import BaseRepository from './baseRepository'

class PermissionsRepository extends BaseRepository {

    public constructor () {
        super('permissions')
    }

    public async create (document: any) {
        const permission = await this.getOne({ tenant: document.tenant, label: document.label })
        if (permission.label) {
            throw new Error('Permission: Such permission already exists')
        }

        await super.create(document)
    }

}

export default new PermissionsRepository()
