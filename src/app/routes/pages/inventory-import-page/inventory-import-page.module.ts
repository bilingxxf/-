import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { InventoryImportPageComponent } from './inventory-import-page.component'
// import { ComponentTableComponent } from './component-table/component-table.component'
import { EnclosureTableComponent } from './enclosure-table/enclosure-table.component'
import { SupportMaterialTableComponent } from './support-material-table/support-material-table.component'
// import { RecordTableComponent } from './record-component-table/record-table.component'
import { ComponentTableModule } from './component-table/component-table.module'

const COMPONENT_NOROUNT = [
  InventoryImportPageComponent,
  // ComponentTableComponent,
  // RecordTableComponent,
  EnclosureTableComponent,
  SupportMaterialTableComponent];

@NgModule({
  imports: [
    SharedModule,
    ComponentTableModule,
    RouterModule.forChild([{ path: '', component: InventoryImportPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  exports: [
    // RecordTableComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InventoryImportPageModule { }
