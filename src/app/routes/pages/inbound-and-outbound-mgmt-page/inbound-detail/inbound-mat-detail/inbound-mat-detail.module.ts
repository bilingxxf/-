import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InboundMatDetailComponent } from './inbound-mat-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      InboundMatDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InboundMatDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InboundMatDetailModule { }
