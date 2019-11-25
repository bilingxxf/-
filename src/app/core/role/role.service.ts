import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UserService } from '../user/user.service'
import { UtilService } from '@core/util/util.service'
import { Paginate } from '../common-entity/paginate'
import { PagingData } from '../common-entity/paging-data'
import { Role } from '@core/role/role'
import { QRPeopleDTO } from '@core/role/qr-people-dto'
import { ContainPeopleDTO } from '@core/role/contain-people-dto'

import { filter } from 'rxjs/operators'
import { promise } from 'protractor'

@Injectable()
export class RoleService {

    constructor(
        private userService: UserService,
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * c
     *
     * @param companyId
     * @param name
     */
    async c(name: string) {
        const companyId = (await this.userService.getUser()).companyId
        const isAdmin = await this.userService.currentUserIsAdmin()
        const dto = isAdmin ? { name } : { companyId, name }
        return this.http.post('/roles', dto).toPromise()
    }

    async roleList() {
       return this.http.get('/roles').toPromise()
    }

    //添加生产线
    async addLine(name: string, productionLineType: number) {
        const companyId = (await this.userService.getUser()).companyId
        const isAdmin = await this.userService.currentUserIsAdmin()
        const dto = isAdmin ? { name } : { companyId, name, productionLineType }
        return this.http.post('/production_line/save', dto).toPromise()
    }
    // 生产线管理  新增用户  获取用户列表
    async lineProductUser(companyId: number): Promise<any> {
        const dto = {
            companyId,
            page:1,
            size: 1000
        }
        return this.http.get(`/users/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    // 2019-9-21 修改接口地址
    async lineProductNewUser(): Promise<any> {
        return this.http.get(`/users/actions/query-enabled`).toPromise()
    }


    /**
     * 或者角色的所有权限
     *
     * @param roleId 角色id
     */
    async getPermissionIdByRoleId(roleId: number): Promise<number[]> {
        const dto = {
            page: 1,
            size: 1000,
            roleId
        }
        return (await this.http.get(`/roles/permissions/links?${this.utilService.objToSearch(dto)}`).toPromise()).data.filter(Boolean).map(o => o.id)
    }

    async getPermissionGroupByRoleId(roleId: number) {
        return await this.http.get(`/roles/permissions/group-links/actions/list?roleId=${roleId}`).toPromise();
    }

    async addPermissionGroup(roleId: number, groupId: number, type: number){
        return await this.http.post(`/roles/permissions/group-links/group-id?roleId=${roleId}&groupId=${groupId}&type=${type}`).toPromise();
    }

    async removePermissionGroup(roleId: number, groupId: number, type: number) {
        return await this.http.delete(`/roles/permissions/group-links/group-id?roleId=${roleId}&groupId=${groupId}&type=${type}`).toPromise();
    }

    /**
     * 删除角色的某个权限
     *
     * @param roleId 角色id
     * @param permissionId 权限id
     */
    async deletePermission(roleId: number, permissionId: number): Promise<void> {
        return this.http.delete(`/roles/permissions/links?roleId=${roleId}&permissionIds=${permissionId}`).toPromise()
    }

    /**
     * 增加角色的某个权限
     *
     * @param roleId 角色id
     * @param permissionId 权限id
     */
    async addPermission(roleId: number, permissionId: number): Promise<void> {
        return this.http.post(`/roles/permissions/links?roleId=${roleId}&permissionIds=${permissionId}`, null).toPromise()
    }

    // 添加生产线与角色关联
    async addRoleProduct(userId: number, productionLineId: number, type: number): Promise<any> {
        let dto = {
            userId,
            productionLineId,
            type
        }
        return this.http.post(`/ProductionLineUserLink/save`, dto).toPromise()
    }
    //  新增公司联系人
    async addContact(userId: number, companyId: number, type: number): Promise<any> {
        let dto = {
            userId,
            companyId,
            type
        }
        return this.http.post(`/company/contact`, dto).toPromise()
    }

    //  修改公司联系人
    async editContact(userId: number, id: number): Promise<any> {
        let dto = {
            userId,
            id
        }
        return this.http.put(`/company/contact/update`, dto).toPromise()
    }



    // 查询公司生产线的总装人员信息
    async fetchProductLineInfo(): Promise<any> {
        return this.http.get(`/ProductionLineUserLink/find/users`).toPromise()
    }

    list(dto: Paginate): Promise<PagingData<Role>> {
        return this.http.get(`/roles?${this.utilService.objToSearch(dto)}`).toPromise()
    }

     //根据公司id查询生产线列表
     productionLine(dto: Paginate): Promise<PagingData<Role>> {
        return this.http.get(`/production_line/find/list?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    //根据id查询生产线
    searchLineId(dto: Paginate): Promise<PagingData<Role>> {
        return this.http.get(`/production_line/find/get?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    // 根据生产线与用户关联id获得其对应制造和检验人员
    fetchFinalAssemblyUser(id:string): Promise<any> {
        return this.http.get(`/ProductionLineUserLink/find/product/users?id=${id}`).toPromise()
    }

    // 获取直发工地流程人员
    fetchSiteUser(): Promise<any> {
        return this.http.get(`/supplier/construction-site`).toPromise()
    }

    // 获取直发工厂流程人员
    fetchFactoryUser(): Promise<any> {
        return this.http.get(`/supplier/factory`).toPromise()
    }

    // 根据围护生产线id获得对应的人员
    fetchFinalContainUser(id: number): Promise<any> {
        return this.http.get(`/production_line/find/containment/get?id=${id}`).toPromise()
    }

    /**
     * 获取全部
     */
    async getAll(): Promise<Role[]> {
        const dto = {
            page: 1,
            size: 1000
        }
        return (await this.list(dto)).data
    }

    async edit(role: Role):Promise<any> {
        return this.http.put(`/roles/${role.id}`, role).toPromise()
    }

    //编辑生产线
    async editLine(role: Role):Promise<any> {
        return this.http.put(`/production_line/update?id=${role.id}`, role).toPromise()
    }

    async remove(role: Role):Promise<any> {
        return this.http.delete(`/roles/${role.id}`).toPromise()
    }

    //删除生产线
    async remove_line(role: Role):Promise<any> {
        return this.http.delete(`/production_line/delete?id=${role.id}`).toPromise()
    }

    // 添加扫码人
    async create_qrPeople(dto: QRPeopleDTO):Promise<any> {
        return this.http.post(`/processConfirm/save`, dto).toPromise()
    }

    // 公司角色
    async rolesList():Promise<any> {
        return this.http.get(`/roles/list`).toPromise()
    }

    // 添加围护扫码人
    async saveContainPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.post(`/ProductionLineUserLink/save`, dto).toPromise()
    }

    // 更新、添加 供应商 与角色关联
    async saveSupplierPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.post(`/supplier/save-role?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    //  添加 供应商 与用户关联
    async saveUserPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.post(`/supplier/save-user?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    //  更新 供应商 与用户关联
    async updateUserPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.put(`/supplier/update-user?id=${dto.id}&userId=${dto.userId}`, dto).toPromise()
    }

    // 删除供应商 角色
    async delRolePeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.delete(`/supplier/delete-role?id=${dto.id}`).toPromise()
    }

    // 删除供应商 用户
    async delUserPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.delete(`/supplier/delete-user?id=${dto.id}`).toPromise()
    }

    // 更新扫码人
    async update_qrPeople(dto: QRPeopleDTO):Promise<any> {
        return this.http.put(`/processConfirm/update?id=${dto.id}`, dto).toPromise()
    }

    //更新围护扫码人
    async update_containPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.put(`/ProductionLineUserLink/update`, dto).toPromise()
    }

    //删除扫码人
    async del_qrPeople(dto: QRPeopleDTO):Promise<any> {
        return this.http.delete(`/processConfirm/delete?id=${dto.id}`).toPromise()
    }

    // 删除围护扫码人
    async del_containPeople(dto: ContainPeopleDTO):Promise<any> {
        return this.http.delete(`/ProductionLineUserLink/delete?id=${dto.id}`).toPromise()
    }
    
    // 消息通知
    async messageNotice(companyId: number, queryDate: string, page: number, size: number): Promise<any> {
        let dto = {
            companyId,
            queryDate,
            page,
            size
        }
        return this.http.get(`/message/notice/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
    }

}
