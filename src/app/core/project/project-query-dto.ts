import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { ProjectStatus } from '../../constant/project-status.enum'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../constant/variable.constant'

export class ProjectQueryDto extends ListQueryWithCompanyId {
    name?: string

    status?: ProjectStatus

    Authorization?: string

    type?: number

    yearAndMonthDate?: string

    year: number

    companyId?: number
    constructor() {
        super()
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
    }
}
