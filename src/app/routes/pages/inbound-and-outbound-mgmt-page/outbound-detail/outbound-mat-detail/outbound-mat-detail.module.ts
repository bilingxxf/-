import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OutboundMatDetailComponent } from './outbound-mat-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      OutboundMatDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      OutboundMatDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class OutboundMatDetailModule { }
