import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// import { RouterModule } from '@angular/router';
import { EnclosurePrintLabelTableModule } from './enclosure-print-label-table/enclosure-print-label-table.module'
import { ComponentTableModule } from '../inventory-import-page/component-table/component-table.module'
import { PrintLabelPageComponent } from './print-label-page.component'
import { ComponentPrintLabelTableComponent } from './component-print-label-table/component-print-label-table.component'
// import { ComponentLabelPreviewModalComponent } from './component-label-preview-modal/component-label-preview-modal.component'
import { SuppoprtMaterialPrintLableTableModule } from './suppoprt-material-print-lable-table/suppoprt-material-print-lable-table.module'


const COMPONENT_NOROUNT = [
  PrintLabelPageComponent,
  ComponentPrintLabelTableComponent,
  // ComponentLabelPreviewModalComponent,
];
@NgModule({
  imports: [
    SharedModule,
    SuppoprtMaterialPrintLableTableModule,
    ComponentTableModule,
    EnclosurePrintLabelTableModule // TODO:该module暂时无用，待确认
    // RouterModule.forChild([{ path: '', component: PrintLabelPageComponent }])
  ],
  exports: [
    PrintLabelPageComponent
  ],
  declarations: [
    ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PrintLabelPageModule { }
