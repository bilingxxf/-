import { Component, OnInit, Input } from '@angular/core'
import { SecurityLogDetail } from '../../../../core/security-log/security-log-detail'
import { SecurityLogService } from '../../../../core/security-log/security-log.service'
import { SecurityLogSituations } from '../../../../constant/security-log-situations.enum'

@Component({
  selector: 'app-security-log-detail-modal',
  templateUrl: './security-log-detail-modal.component.html',
})
export class SecurityLogDetailModalComponent implements OnInit {

    @Input() id: number

    securityLogDetail = new SecurityLogDetail()

    securityLogSituations = SecurityLogSituations

    constructor(
        private securityLogService: SecurityLogService
    ) { }

    async ngOnInit() {
        this.securityLogDetail = await this.securityLogService.d(this.id)
    }

}
