import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HistoryOutboundListModule } from './history-outbound-list/history-outbound-list.module'
import { OutboundDetailModule } from './outbound-detail/outbound-detail.module'
import { PackingListModule } from './packing-list/packing-list.module'
import { InboundAndOutboundMgmtPageComponent } from './inbound-and-outbound-mgmt-page.component'
import { OutboundBoardComponent } from './outbound-board/outbound-board.component'
import { InboundBoardComponent } from './inbound-board/inbound-board.component'
import { WarehousingBoardComponent } from './warehousing-board/warehousing-board.component'
import { WarehousingBoardTableComponent } from './warehousing-board-table/warehousing-board-table.component'
import { BoardComponent } from './board/board.component'
import { WarehousingMgmtPageModule } from '../warehousing-mgmt-page/warehousing-mgmt-page.module'
import { SupplieMgmtPageModule } from './supplie-mgmt-page/supplie-mgmt-page.module';
import { InboundDetailModule } from './inbound-detail/inbound-detail.module'
import { WarehousingEnclBoardComponent } from './warehousing-board/warehousing-encl-board/warehousing-encl-board.component';
import { WarehousingMatBoardComponent } from './warehousing-board/warehousing-mat-board/warehousing-mat-board.component';
import { MatBoardComponent } from './mat-board/mat-board.component';
import { EnclBoardComponent } from './encl-board/encl-board.component'


const COMPONENT_NOROUNT = [
  InboundAndOutboundMgmtPageComponent,
  OutboundBoardComponent,
  InboundBoardComponent,
  WarehousingBoardComponent,
  WarehousingBoardTableComponent,
  BoardComponent
];

@NgModule({
  imports: [
    SharedModule,
    WarehousingMgmtPageModule,
    HistoryOutboundListModule,
    PackingListModule,
    SupplieMgmtPageModule,
    InboundDetailModule,
    OutboundDetailModule,
    RouterModule.forChild([{ path: '', component: InboundAndOutboundMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      WarehousingEnclBoardComponent,
      WarehousingMatBoardComponent,
      MatBoardComponent,
      EnclBoardComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InboundAndOutboundMgmtPageModule { }
