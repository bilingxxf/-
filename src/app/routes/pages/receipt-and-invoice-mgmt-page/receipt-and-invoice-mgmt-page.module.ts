import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReceiptAndInvoiceMgmtPageComponent } from './receipt-and-invoice-mgmt-page.component'
import { InvoiceMgmtModule } from './invoice-mgmt/invoice-mgmt.module'
import { ReceiptMgmtModule } from './receipt-mgmt/receipt-mgmt.module'

const COMPONENT_NOROUNT = [
  ReceiptAndInvoiceMgmtPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    InvoiceMgmtModule,
    ReceiptMgmtModule,
    RouterModule.forChild([{ path: '', component: ReceiptAndInvoiceMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ReceiptAndInvoiceMgmtPageModule { }
