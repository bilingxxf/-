import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InvoiceMgmtComponent } from './invoice-mgmt.component'
import { InvoiceCreateModalComponent } from './invoice-create-modal/invoice-create-modal.component'


const COMPONENT_NOROUNT = [
  InvoiceMgmtComponent,
  InvoiceCreateModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    InvoiceMgmtComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InvoiceMgmtModule { }
