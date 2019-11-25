import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinishedPanelBoardModule } from '../finished-panel-board/finished-panel-board.module'
import { ReceiptPanelComponent } from './receipt-panel.component'


const COMPONENT_NOROUNT = [
  ReceiptPanelComponent
];

@NgModule({
  imports: [
    SharedModule,
    FinishedPanelBoardModule
  ],
  exports: [
    ReceiptPanelComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ReceiptPanelModule { }
