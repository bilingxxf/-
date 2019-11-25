import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ApprovalService } from '../../../core/approval/approval.service'
import { Router } from '@angular/router'
import { ApprovalReqDto } from '../../../core/approval/approval-req-dto'
import { NzModalRef, NzMessageService, NzNotificationService } from 'ng-zorro-antd'

@Component({
  selector: 'app-approval-modal',
  templateUrl: './approval-modal.component.html',
})
export class ApprovalModalComponent implements OnInit {

    submitting = false

    @Input() taskId: string

    dto = new ApprovalReqDto()

    constructor(
        private approvalService: ApprovalService,
        private router: Router,
        private subject: NzModalRef,
        private msg: NzMessageService,
        private notification: NzNotificationService
    ) { }

    ngOnInit() {
        this.dto.taskId = this.taskId
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.submitting = true
            await this.approvalService.approval(this.dto)
            this.notification.success('审批完成', '')
            this.router.navigate(['/approval-mgmt'])
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }
}
