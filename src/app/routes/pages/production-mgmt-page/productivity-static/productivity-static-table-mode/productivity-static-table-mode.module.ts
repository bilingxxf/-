import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductivityStaticTableModeComponent } from './productivity-static-table-mode.component'
// import { ProductivityStaticStructureTableComponent } from './productivity-static-structure-table/productivity-static-structure-table.component'
// import { ProductivityStaticEnclosureTableComponent } from './productivity-static-enclosure-table/productivity-static-enclosure-table.component'

const COMPONENT_NOROUNT = [
  ProductivityStaticTableModeComponent,
  // ProductivityStaticStructureTableComponent,
  // ProductivityStaticEnclosureTableComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports:[
    ProductivityStaticTableModeComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductivityStaticTableModeModule { }
