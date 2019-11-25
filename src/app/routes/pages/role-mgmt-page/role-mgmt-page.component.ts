import { Component, OnInit, ViewChild } from '@angular/core'
import { Paginate } from '@core/common-entity/paginate'
import { SimpleTableComponent, SimpleTableColumn } from '@delon/abc'
import { RoleService } from '../../../core/role/role.service'
import { UserService } from '@core/user/user.service'
import swal, { SweetAlertType } from 'sweetalert2'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { Role } from '../../../core/role/role'
import { RoleSetPermissionModalComponent } from './role-set-permission-modal/role-set-permission-modal.component'
import { RoleQueryDto } from '@core/role/role-query-dto'
import { PagingData } from '../../../core/common-entity/paging-data'

@Component({
  selector: 'app-role-mgmt-page',
  templateUrl: './role-mgmt-page.component.html',
})
export class RoleMgmtPageComponent implements OnInit {

    dto = new RoleQueryDto()

    data = new PagingData<Role>()

    constructor(
        private roleService: RoleService,
        private msg: NzMessageService,
        public userService: UserService,
        private modal: NzModalService
    ) { }

    async ngOnInit() {
        if (!await this.userService.currentUserIsAdmin()) {
            this.dto.companyId = (await this.userService.getUser()).companyId
        }
        this.getData()
    }

    async getData() {
        this.data = await this.roleService.list(this.dto)
    }

    async edit(row: Role) {
        try {
            await this.roleService.edit(row);
            this.msg.success('编辑成功');
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    async remove(row: Role) {
        try {
            await this.roleService.remove(row);
            this.msg.success('操作成功');
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    /**
     * 创建角色
     */
    async c(row?: Role) {
        const { value: name } = await swal({
            title: '请输入角色名称',
            input: 'text',
            showCancelButton: true,
            // value: row ? row.name : ''
        })

        if (!name) return
        try {
            if (row && row.id) {
                await this.roleService.edit({
                    ...row,
                    name: name
                });
                this.msg.success(`角色: "${name}"创建成功`)
                this.getData()
            } else {
                await this.roleService.c(name)
                this.msg.success(`角色: "${name}"创建成功`)
                this.getData()
            }
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    async openSetPermissionModal(role: Role) {
        this.modal.create({
            nzTitle: `权限设置 (${role.name})`,
            nzWidth: 600,
            nzComponentParams: { role },
            nzContent: RoleSetPermissionModalComponent,
            nzFooter: null
        })
    }
}
