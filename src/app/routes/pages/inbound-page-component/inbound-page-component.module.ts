import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InboundPageComponentComponent } from './inbound-page-component.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InboundPageComponentComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InboundPageComponentModule { }
