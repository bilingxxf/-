import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-receipt-and-invoice-mgmt-page',
  templateUrl: './receipt-and-invoice-mgmt-page.component.html',
})
export class ReceiptAndInvoiceMgmtPageComponent implements OnInit {

    projectId: number

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
    }

}
