import { User } from '../models'
import { UserData } from '../database/repositories'

export class UserService {

    public static async create (user: User): Promise<void> {
        // TODO hash password
        const currentUser: User = await UserData.getOne(user.username)
        if (!currentUser) {
            await UserData.create(user)
        }
    }

    public static async exists (username: string, password: string): Promise<boolean> {
        // TODO: has the password
        return UserData.getOne({
            username,
            password
        })
    }

}
