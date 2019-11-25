import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SuppoprtMaterialPrintLableTableComponent } from './suppoprt-material-print-lable-table.component'
// import { SuppoprtMaterialLabelPreviewModalComponent } from '../suppoprt-material-label-preview-modal/suppoprt-material-label-preview-modal.component'


const COMPONENT_NOROUNT = [
  SuppoprtMaterialPrintLableTableComponent,
  // SuppoprtMaterialLabelPreviewModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    SuppoprtMaterialPrintLableTableComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class SuppoprtMaterialPrintLableTableModule { }
