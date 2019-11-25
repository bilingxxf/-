import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-invoice-mgmt-modal',
  templateUrl: './invoice-mgmt-modal.component.html',
})
export class InvoiceMgmtModalComponent implements OnInit {

    o: any = {
        show: false
    }

    data = [
        {
            date: moment().subtract(2, 'M').toDate(),
            amount: 55000,
            remark: '普票',
            editting: false
        },
        {
            date: moment().subtract(1, 'M').toDate(),
            amount: 50000,
            remark: '普票',
            editting: false
        }
    ]

    constructor(
    ) { }

    ngOnInit() {
    }
}
