import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinishedPanelBoardModule } from '../finished-panel-board/finished-panel-board.module'
import { FixPanelComponent } from './fix-panel.component'


const COMPONENT_NOROUNT = [
  FixPanelComponent
];

@NgModule({
  imports: [
    SharedModule,
    FinishedPanelBoardModule
  ],
  exports: [
    FixPanelComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixPanelModule { }
