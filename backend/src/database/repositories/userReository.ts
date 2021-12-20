import BaseRepository from './baseRepository'

class UserRepository extends BaseRepository {

    public constructor () {
        super('users')
    }

}

export default new UserRepository()
