import { Component, OnInit } from '@angular/core'
import { EnterpriseCDto } from '../../../core/enterprise/enterprise-c-dto'
import { EnterpriseService } from '../../../core/enterprise/enterprise.service'
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
import { SystemUserCDto } from '../../../core/system-user/system-user-c-dto'

@Component({
  selector: 'app-enterprise-c-page',
  templateUrl: './enterprise-c-page.component.html',
})
export class EnterpriseCPageComponent implements OnInit {

    submitting = false

    enterpriceCDto = new EnterpriseCDto()

    constructor(
        private enterpriseService: EnterpriseService,
        private msg: NzMessageService,
        private notification: NzNotificationService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    async save() {
        this.submitting = true
        try {
            await this.enterpriseService.c(this.enterpriceCDto)
            this.notification.success('创建成功', '')
            this.router.navigate(['/enterprise-mgmt'])
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }

}
