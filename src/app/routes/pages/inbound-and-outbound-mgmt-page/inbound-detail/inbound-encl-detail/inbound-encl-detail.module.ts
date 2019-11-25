import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InboundEnclDetailComponent } from './inbound-encl-detail.component';
import { InboundEnclDetailModalComponent } from './inbound-encl-detail-modal/inbound-encl-detail-modal.component';


const COMPONENT_NOROUNT = [
  InboundEnclDetailModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      InboundEnclDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InboundEnclDetailComponent,
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InboundEnclDetailModule { }
