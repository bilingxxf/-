import { Component, OnInit, Input } from '@angular/core'
import { InvoiceTypes } from '../../../../../constant/invoice-types.enum'
import { InvoiceService } from '../../../../../core/invoice/invoice.service'
import { InvoiceCDto } from '@core/invoice/invoice-c-dto'
import { NzMessageService, NzModalRef } from 'ng-zorro-antd'
import * as moment from 'moment'

@Component({
  selector: 'app-receipt-create-modal',
  templateUrl: './receipt-create-modal.component.html',
})
export class ReceiptCreateModalComponent implements OnInit {
    @Input() projectId: number
    @Input() dto: InvoiceCDto = new InvoiceCDto()

    submitting = false

    amount: number

    // dto = new InvoiceCDto()

    date: string | Date = ''

    constructor(
        private invoiceService: InvoiceService,
        private msg: NzMessageService,
        private subject: NzModalRef,
    ) { }

    async ngOnInit() {
        this.dto.projectId = this.projectId
        this.dto.type = InvoiceTypes.收款
        if (this.dto.id) {
            this.amount = parseInt((this.dto.amount/10000).toFixed(0));
            this.date = new Date(this.dto.operationDate);
        }
    }
    disabledDate(current: Date):boolean {
        return current && current.getTime() > Date.now();
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.dto.amount = this.amount * 10000
            this.dto.operationDate = moment(this.date).valueOf()
            this.submitting = true
            if (this.dto.id) {
                await this.invoiceService.edit(this.dto)
            } else {
                await this.invoiceService.c(this.dto)
            }
            this.msg.success('添加成功')
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }
}
