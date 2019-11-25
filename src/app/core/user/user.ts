import { Permission } from '../permission/permission'
import { Role } from '../role/role'
import { Department } from '@core/department/department';
export class User {
    id: number
    name: string
    companyId: number
    username: string
    phone: string

    permissions: Permission[] = []

    role = new Role()

    department: Department
}
