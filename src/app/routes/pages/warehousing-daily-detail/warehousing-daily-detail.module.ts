import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HistoryOutboundListModule } from '../inbound-and-outbound-mgmt-page/history-outbound-list/history-outbound-list.module'
import { WarehousingDailyDetailComponent } from './warehousing-daily-detail.component'
import { InboundDetailTableComponent } from './inbound-detail-table/inbound-detail-table.component'

const COMPONENT_NOROUNT = [
  WarehousingDailyDetailComponent,
  InboundDetailTableComponent
];

@NgModule({
  imports: [
    SharedModule,
    HistoryOutboundListModule,
    RouterModule.forChild([{ path: '', component: WarehousingDailyDetailComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class WarehousingDailyDetailModule { }
