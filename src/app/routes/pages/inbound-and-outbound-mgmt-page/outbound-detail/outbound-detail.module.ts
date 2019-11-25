import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { OutboundStrucDetailModule } from './outbound-struc-detail/outbound-struc-detail.module'
import { OutboundEnclDetailModule } from './outbound-encl-detail/outbound-encl-detail.module'
import { OutboundMatDetailModule } from './outbound-mat-detail/outbound-mat-detail.module'
import { OutboundDetailComponent } from './outbound-detail.component';
import { HistoryOutboundListModule } from '../history-outbound-list/history-outbound-list.module'


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    OutboundStrucDetailModule,
    OutboundEnclDetailModule,
    OutboundMatDetailModule,
    HistoryOutboundListModule
  ],
  exports: [
    OutboundDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      OutboundDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class OutboundDetailModule { }
