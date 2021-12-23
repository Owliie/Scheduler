import { Request } from 'express'
import { IdentityUser } from './identity-user'

export interface AuthenticatedRequest extends Request {
    user: IdentityUser;
}
