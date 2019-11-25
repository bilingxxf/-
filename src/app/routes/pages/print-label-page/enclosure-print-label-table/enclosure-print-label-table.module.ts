import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EnclosurePrintLabelTableComponent } from './enclosure-print-label-table.component'
// import { EnclosureLabelPreviewModalComponent } from '../enclosure-label-preview-modal/enclosure-label-preview-modal.component'

const COMPONENT_NOROUNT = [
  EnclosurePrintLabelTableComponent,
  // EnclosureLabelPreviewModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    EnclosurePrintLabelTableComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class EnclosurePrintLabelTableModule { }
