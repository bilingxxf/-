import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HistoryInboundListComponent } from './history-inbound-list.component'
import { CarInListDetailModalComponent } from '../../cargo-list-mgmt-page/carIn-list-detail-modal/cargo-list-detail-modal.component'
import { CarInListDetailByUserModalComponent } from '../../cargo-list-mgmt-page/carIn-list-detail-by-user-modal/carIn-list-detail-by-user-modal.component'


const COMPONENT_NOROUNT = [
  HistoryInboundListComponent,
  CarInListDetailModalComponent,
  CarInListDetailByUserModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistoryInboundListComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class HistoryInboundListModule { }
