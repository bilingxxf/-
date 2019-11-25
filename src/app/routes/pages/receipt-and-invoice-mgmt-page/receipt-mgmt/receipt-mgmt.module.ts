import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ReceiptMgmtComponent } from './receipt-mgmt.component'
import { ReceiptCreateModalComponent } from './receipt-create-modal/receipt-create-modal.component'


const COMPONENT_NOROUNT = [
  ReceiptMgmtComponent,
  ReceiptCreateModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ReceiptMgmtComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ReceiptMgmtModule { }
