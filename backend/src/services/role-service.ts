import { Permission, Role, UserRoles } from '../database/repositories'

export class RoleService {

    public static async createPermission (tenant: string, permission: any): Promise<void> {
        await Permission.create({ tenant, ...permission })
    }

    public static async createRole (tenant: string, role: any): Promise<void> {
        if (role.roles.length > 0) {
            const roles = await Role.batchGetWhere({ tenant }, 'label', role.roles)
            if (roles.length !== role.roles.length) {
                throw new Error('Role: All child roles should be created beforehand')
            }
        }

        if (role.permissions.length > 0) {
            const permissions = await Permission.batchGetWhere({ tenant }, 'label', role.permissions)
            if (permissions.length !== role.permissions.length) {
                throw new Error('Role: All permission should be created beforehand')
            }
        }

        await Role.create({ label: role.label, tenant })
    }

    public static async getPermissionsByRoles (tenant: string, rolesLabels: string[]): Promise<any[]> {
        const roles = await Role.batchGetWhere({ tenant }, 'label', rolesLabels)

        return Permission.batchGetWhere({ tenant }, 'number', roles)
    }

    public static async getRoles (tenant: string): Promise<any[]> {
        return Role.getAllBy({ tenant })
    }

    public static async hasAccess (tenant: string, roles: any[], permissionLabel: any): Promise<boolean> {
        // add logic
        return true
    }

    public static async assignRole (tenant: string, email: string, roles: any[]): Promise<void> {
        const tenantRoles = await Role.batchGetWhere({ tenant }, 'label', roles)
        if (tenantRoles.length !== roles.length) {
            throw new Error('Role: Can not assign not existing role to a user')
        }

        const userCurrentRoles = await UserRoles.getOne({ email: email })
        await UserRoles.replaceOne(
            { email },
            { email, roles: [...new Set([...userCurrentRoles.roles || [], ...roles])] }
        )
    }

    public static async setUsersRoles (users: any[]): Promise<void> {
        const emails = []
        for (let i = 0; i < users.length; i++) {
            emails.push(users[i].email)
        }

        const usersRoles = await UserRoles.batchGet('email', emails, true)
        for (let i = 0; i < users.length; i++) {
            users[i].roles = usersRoles[i].roles
        }
    }

}
