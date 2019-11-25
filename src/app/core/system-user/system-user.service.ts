import { Injectable } from '@angular/core'
import { HttpClientService } from '../http-client/http-client.service'
import { UtilService } from '../util/util.service'
import { ListQueryWithCompanyId } from '../common-entity/list-query-with-company-id'
import { PagingData } from '../common-entity/paging-data'
import { SystemUser } from '@core/system-user/system-user'
import { SystemUserCDto } from './system-user-c-dto'

@Injectable()
export class SystemUserService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    list(dto: ListQueryWithCompanyId): Promise<PagingData<SystemUser>> {
        return this.http.get(`/users/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    // 项目成员接口地址变化
    listNewInterface(): Promise<PagingData<SystemUser>> {
        return this.http.get(`/users/actions/query-enabled`).toPromise()
    }

    //根据公司id查询生产线列表
    productionLine(dto: ListQueryWithCompanyId): Promise<PagingData<SystemUser>> {
        return this.http.get(`/production_line/find/list?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    disableUser(userId: number):Promise<any> {
        return this.http.put(`/users/actions/disable?userId=${userId}`, {}).toPromise();
    }

    edit(user: SystemUser):Promise<any> {
        return this.http.put(`/users/${user.id}`, user).toPromise();
    }

    c(dto: SystemUserCDto): Promise<SystemUser> {
        return this.http.post('/users', dto).toPromise()
    }
}
