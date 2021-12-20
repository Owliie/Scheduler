import BaseRepository from './baseRepository'

class RoleRepository extends BaseRepository {

    public constructor () {
        super('roles')
    }

    public async create (document: any) {
        const role = await super.getOne({ tenant: document.tenant, label: document.label })
        if (role.label) {
            throw new Error('Role: Such role already exists')
        }

        await super.create(document)
    }

}

export default new RoleRepository()
