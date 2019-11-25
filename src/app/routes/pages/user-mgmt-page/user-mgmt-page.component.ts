import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { SystemUserService } from '../../../core/system-user/system-user.service'
import { PagingData } from '@core/common-entity/paging-data'
import { SystemUser } from '@core/system-user/system-user'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { UserCModalComponent } from './user-c-modal/user-c-modal.component'
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component'


@Component({
  selector: 'app-user-mgmt-page',
  templateUrl: './user-mgmt-page.component.html',
})
export class UserMgmtPageComponent implements OnInit {
        
    dto = new ListQueryWithCompanyId()

    data = new PagingData<SystemUser>()

    username = ''

    constructor(
        private systemUserService: SystemUserService,
        private message: NzMessageService,
        private modal: NzModalService
    ) { }

    ngOnInit() {
        this.getData()
    }

    search() {
        this.dto.page = 1;
        // this.dto.username = this.username
        console.log('this.dto-------------------',this.dto)
        this.getData()
    }

    async getData() {
        // console.log('公司的用户'+ this.dto.companyId)
        this.data = await this.systemUserService.list(this.dto)
    }

    resetPageAndGetData() {
        setTimeout(() => {
            this.data.pageNo = 1
            this.getData()
        }, 0)
    }

    reset() {
        this.dto = new ListQueryWithCompanyId()
        this.resetPageAndGetData()
    }

    async disable(user: SystemUser) {
        try {
            await this.systemUserService.disableUser(user.id);
            user.isEnabled = !user.isEnabled;
            this.message.success('操作成功');
        } catch (e) {

        }
    }

    async c() {
        this.modal.create({
            nzTitle: `创建用户`,
            nzContent: UserCModalComponent,
            // componentParams: {
            //     projectId: this.projectId,
            //     date
            // },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.getData()
            },
            nzFooter: null
        })
    }

    async edit(user: SystemUser) {
        this.modal.create({
            nzTitle: '编辑用户',
            nzContent: UserEditModalComponent,
            nzComponentParams: {
                dto: user
            },
            nzWidth: 600,
            nzMaskClosable: false,
            nzOnOk: async () => {
                this.getData()
            },
            nzFooter: null
        })
    }
}
