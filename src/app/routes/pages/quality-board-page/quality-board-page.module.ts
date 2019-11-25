import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { QualityBoardPageComponent } from './quality-board-page.component'
import { ComponentQualityBoardTableComponent } from './component-quality-board-table/component-quality-board-table.component'
import { EnclosureQualityBoardTableComponent } from './enclosure-quality-board-table/enclosure-quality-board-table.component'
import { ComponentBoardComponent } from './component-board/component-board.component'
import { EnclosureBoardComponent } from './enclosure-board/enclosure-board.component'


const COMPONENT_NOROUNT = [
  QualityBoardPageComponent,
  ComponentQualityBoardTableComponent,
  EnclosureQualityBoardTableComponent,
  ComponentBoardComponent,
  EnclosureBoardComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    QualityBoardPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class QualityBoardPageModule { }
