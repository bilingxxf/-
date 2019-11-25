import { Injectable } from '@angular/core'
import { UserService } from '@core/user/user.service'
import { Permission } from './permission'
import { HttpClientService } from '../http-client/http-client.service'
import { UtilService } from '../../core/util/util.service'
import { PermissionModuleDTO, LinkPermissionAndGroupDTO, GetPermissionFromGroupDTO } from './permission-module.dto';

@Injectable()
export class PermissionService {

    constructor(
        private userService: UserService,
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * 判断是否在用户权限列表中
     *
     * @param id 权限id
     */
    async hasPermission(id: number): Promise<boolean> {
        const permissions: Permission[] = (await this.userService.getUser()).permissions
        return permissions.filter(Boolean).some(o => o.id === id)
    }

    /**
     * 获取所有权限
     */
    getAll(): Promise<Permission[][]> {
        return this.http.get('/permissions').toPromise()
    }

    /**
     * 新增权限模块
     */
    async addNewPermissionsModule(query: PermissionModuleDTO) {
        return await this.http.post('/permission-module', query).toPromise();
    }

    /**
     * 获取对应角色的权限模块
     */
    async getsPermissionsModule() {
        return await this.http.get('/permission-module').toPromise();
    }

    /**
     * 权限组与权限关联
     */
    async linkPermissionGroup(query: LinkPermissionAndGroupDTO) {
        return await this.http.post('/permission-group-links', query).toPromise();
    }

    /**
     * 从权限组下移除
     */
    async removePermisssionFromGroup(id: number) {
        return await this.http.delete(`/permission-group-links/${id}`).toPromise();
    }

    /**
     * 获取权限组下的权限
     */
    async getPermissionFromGroup(query: GetPermissionFromGroupDTO) {
        return await this.http.get(`/permission-group-links/permissions/actions/list?${this.utilService.objToSearch(query)}`).toPromise()
    }

}
