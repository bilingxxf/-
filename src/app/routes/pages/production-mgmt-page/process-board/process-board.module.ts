import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProcessBoardComponent } from './process-board.component';
import { ProductivityStaticTableModeModule } from '../productivity-static/productivity-static-table-mode/productivity-static-table-mode.module'
import { ProductivityStaticTileModeComponent } from '../productivity-static/productivity-static-tile-mode/productivity-static-tile-mode.component'
import { ProductivityStaticStructureTableComponent } from '../productivity-static/productivity-static-table-mode/productivity-static-structure-table/productivity-static-structure-table.component'
import { ProductivityStaticEnclosureTableComponent } from '../productivity-static/productivity-static-table-mode/productivity-static-enclosure-table/productivity-static-enclosure-table.component'


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ProductivityStaticTableModeModule
  ],
  exports: [
    ProcessBoardComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProcessBoardComponent,
      ProductivityStaticTileModeComponent,
      ProductivityStaticStructureTableComponent,
      ProductivityStaticEnclosureTableComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProcessBoardModule { }
