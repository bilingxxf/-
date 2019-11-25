import { Component, OnInit, Input } from '@angular/core'
import { PaymentRemind } from '../../../../core/payment-remind/payment-remind'
import { PaymentRemindService } from '@core/payment-remind/payment-remind.service'
import { MonomerPaymentRemindType } from '../../../../constant/monomer-payment-remind-type.enum'

@Component({
  selector: 'app-project-payment-remind-detail',
  templateUrl: './project-payment-remind-detail.component.html',
})
export class ProjectPaymentRemindDetailComponent implements OnInit {

    type: MonomerPaymentRemindType

    types = MonomerPaymentRemindType

    reminds: PaymentRemind[] = []

    @Input() projectId: number

    constructor(
        private paymentRemindService: PaymentRemindService
    ) { }

    async ngOnInit() {
        this.reminds = await this.paymentRemindService.getByProjectId(this.projectId)
        if (this.reminds.length) this.type = this.reminds[0].type
    }

}
