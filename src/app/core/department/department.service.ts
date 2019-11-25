import { Injectable } from '@angular/core'
import { DepartmentCDto } from './department-c-dto'
import { UserService } from '../user/user.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { DepartmentQueryDto } from './department-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { UtilService } from '@core/util/util.service'
import { Department } from '@core/department/department'
import { DepartmentTreeDto } from './department-tree';

@Injectable()
export class DepartmentService {

    constructor(
        private userService: UserService,
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * c
     *
     */
    async c(query: DepartmentTreeDto): Promise<void> {
        // const dto = new DepartmentCDto()
        // dto.name = name
        // dto.companyId = await this.userService.getCurrentUserCompanyId()
        return this.http.post('/departments', query).toPromise()
    }

    list(dto: DepartmentQueryDto): Promise<PagingData<Department>> {
        return this.http.get(`/departments?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    async getAll(): Promise<Department[]> {
        const companyId = await this.userService.getCurrentUserCompanyId()
        return this.http.get(`/departments?companyId=${companyId}`).toPromise()
    }

    /**
     * 为部门添加用户
     *
     * @param departmentId
     * @param userIds
     */
    addUser(departmentId: number, ...userIds: number[]) {
        return this.http.post(`/departments/staffs?departmentId=${departmentId}&userIds=${userIds.join(',')}`).toPromise()
    }

    async getDepartmentTrees(companyId: number, id?: number):Promise<DepartmentTreeDto> {
        const query = {
            id,
            companyId
        }
        return this.http.get(`/departments/trees?${this.utilService.objToSearch(query)}`).toPromise();
    }

    async edit(query: DepartmentTreeDto):Promise<any> {
        return this.http.put(`/departments/${query.id}`, query).toPromise()
    }

    async remove(query: DepartmentTreeDto):Promise<any> {
        return this.http.delete(`/departments/${query.id}`).toPromise();
    }

}
