import { Paginate } from '@core/common-entity/paginate'
import { LocalstorageUserKey } from '../../constant/variable.constant'
import { User } from '@core/user/user'

export class ListQueryWithCompanyId extends Paginate {
    companyId?: number
    projectId?: number
    username: string
    id?:number
    createTime?:string
    productionLineType?: number

    constructor() {
        super()
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
    }
}
