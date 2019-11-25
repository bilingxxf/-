import { Component, OnInit, Input } from '@angular/core'
import { SecurityLogService } from '@core/security-log/security-log.service'
import { NzMessageService, NzModalRef } from '../../../../../../node_modules/ng-zorro-antd'
import { Moment } from 'moment'
import { SecurityLogCDto } from '@core/security-log/security-log-c-dto'
import { SecurityLogSituations } from '../../../../constant/security-log-situations.enum'

@Component({
  selector: 'app-security-log-c-modal',
  templateUrl: './security-log-c-modal.component.html',
})
export class SecurityLogCModalComponent implements OnInit {

    @Input() date: Moment

    @Input() projectId: number

    submitting = false

    securityLogSituations = SecurityLogSituations

    dto = new SecurityLogCDto()

    constructor(
        private securityLogService: SecurityLogService,
        private msg: NzMessageService,
        private subject: NzModalRef,
    ) { }

    async ngOnInit() {
        this.dto.recordDate = this.date.format('YYYY-MM-DD')
        this.dto.projectId = this.projectId
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.submitting = true
            await this.securityLogService.c(this.dto)
            this.msg.success('填写成功')
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }
}
