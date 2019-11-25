import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { RoleService } from '@core/role/role.service'
import { NzMessageService } from 'ng-zorro-antd'


@Component({
  selector: 'app-role-set-permisssion-table',
  templateUrl: './role-set-permisssion-table.component.html',
})
export class RoleSetPermisssionTableComponent implements OnInit {
    @Input() permissionModule: any
    @Input() index: number
    @Input() roleId: number
    indexs = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七']


    async link(group, event, type) {
        try {
            let response
            if (event) {
                response = await this.roleService.addPermissionGroup(this.roleId, group.id, type);
            } else {
                response = await this.roleService.removePermissionGroup(this.roleId, group.id, type);
            }
            this.message.success('操作成功');
        } catch (e) {
            this.message.error(e.error.message)
        }
        // switch(type) {
        //     case 1:
                
        //         break;
        //     case 2:
        // }
        // console.log(group);
        // if (event = true) {
        //     const response = await this.roleService.addPermissionGroup(this.roleId, group.id, 1);
        // }
    }

    constructor(
        private roleService: RoleService,
        private http: _HttpClient,
        private message: NzMessageService

    ) { }

    ngOnInit() {
        // console.log(this.permissionModule);
    }

}
