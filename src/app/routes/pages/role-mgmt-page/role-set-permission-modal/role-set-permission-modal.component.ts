import { Component, OnInit, Input } from '@angular/core'
import { Role } from '@core/role/role'
import { Permission } from '../../../../core/permission/permission'
import { PermissionService } from '../../../../core/permission/permission.service'
import { RoleService } from '@core/role/role.service'

type CheckedPermission = Permission & {checked?: boolean}

@Component({
  selector: 'app-role-set-permission-modal',
  templateUrl: './role-set-permission-modal.component.html',
})
export class RoleSetPermissionModalComponent implements OnInit {

    permissions: any[] = []
    modules: any[] = []
    @Input() role = new Role()


    constructor(
        private permissionService: PermissionService,
        private roleService: RoleService
    ) { }

    async ngOnInit() {
        const response = await this.permissionService.getsPermissionsModule();
        for (let name in response) {
            this.modules.push({
                moduleName: name,
                groups: response[name]
            })
        }
        let data = await this.roleService.getPermissionGroupByRoleId(this.role.id);
        let permissionGroups = []
        for (let name in data) {
            const group = data[name];
            [].push.apply(permissionGroups, group)
        }

        this.modules.forEach(module => {
            module.groups = module.groups.map(group => {
                let has_ = permissionGroups.find(val => {
                    return val.name === group.name;
                })
                if (has_) {
                    const typeList = has_.typeList || [];
                    if (typeList.length === 2) {
                        group.editChecked = true;
                        group.queryChecked = true;
                    } else if (typeList.length === 1) {
                        const type = typeList[0];
                        switch(type) {
                            case 1:
                                group.editChecked = true;
                                break;
                            case 2:
                                group.queryChecked = true;
                                break;
                        }
                    }
                }
                return group
            })
        })
        console.log(this.modules, 'this.modules-----------------')
        console.log(permissionGroups, 'permissionGroups-----------------');
        // console.log(permissionGroups);
        // this.permissions = await this.permissionService.getAll()
        // const rolePermissionIds = await this.roleService.getPermissionIdByRoleId(this.role.id)
        // this.permissions.forEach(ps => {
        //     ps.forEach(p => {
        //         // this.change(p.id, true) // 设置权限用
        //         if (rolePermissionIds.includes(p.id)) p.checked = true
        //     })
        // })

    }

    /**
     * 实时调服务端修改角色权限
     *
     * @param permissionId
     * @param checked
     */
    change(permissionId: number, checked: boolean) {
        checked ?
            this.roleService.addPermission(this.role.id, permissionId) :
            this.roleService.deletePermission(this.role.id, permissionId)
    }

}
