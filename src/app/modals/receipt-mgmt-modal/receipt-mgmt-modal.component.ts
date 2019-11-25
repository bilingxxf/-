import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-receipt-mgmt-modal',
  templateUrl: './receipt-mgmt-modal.component.html',
})
export class ReceiptMgmtModalComponent implements OnInit {

    o: any = {
        show: false
    }

    data = [
        {
            date: moment().subtract(2, 'M').toDate(),
            amount: 55000,
            remark: '支票',
            editting: false
        },
        {
            date: moment().subtract(1, 'M').toDate(),
            amount: 50000,
            remark: '支票',
            editting: false
        }
    ]

    constructor(
    ) { }

    ngOnInit() {
    }
}
