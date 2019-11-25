import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinishedPanelBoardComponent } from './finished-panel-board.component'


const COMPONENT_NOROUNT = [
  FinishedPanelBoardComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    FinishedPanelBoardComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FinishedPanelBoardModule { }
