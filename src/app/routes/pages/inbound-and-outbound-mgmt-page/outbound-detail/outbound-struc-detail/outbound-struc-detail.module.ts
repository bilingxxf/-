import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OutboundStrucDetailComponent } from './outbound-struc-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      OutboundStrucDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      OutboundStrucDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class OutboundStrucDetailModule { }
