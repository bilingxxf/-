import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OutboundEnclDetailComponent } from './outbound-encl-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      OutboundEnclDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      OutboundEnclDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class OutboundEnclDetailModule { }
