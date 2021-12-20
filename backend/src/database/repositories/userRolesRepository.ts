import BaseRepository from './baseRepository'

class UserRolesRepository extends BaseRepository {

    public constructor () {
        super('user-roles')
    }

}

export default new UserRolesRepository()
