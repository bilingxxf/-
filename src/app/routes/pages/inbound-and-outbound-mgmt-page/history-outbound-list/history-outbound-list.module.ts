import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HistoryOutboundListComponent } from './history-outbound-list.component'


const COMPONENT_NOROUNT = [
  HistoryOutboundListComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    HistoryOutboundListComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class HistoryOutboundListModule { }
