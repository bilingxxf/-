import { SystemUserCDto } from '@core/system-user/system-user-c-dto'
import { Role } from '@core/role/role'

export class SystemUser extends SystemUserCDto {
    id: number
    role = new Role()
    createTime: number

    /** 部门名称 */
    departmentName: string

    isEnabled: boolean

    checked: boolean
}
