import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PackingListComponent } from './packing-list.component';
import { PackingLabelPreviewModalComponent } from './packing-label-preview-modal/packing-label-preview-modal.component';


const COMPONENT_NOROUNT = [
  PackingLabelPreviewModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    PackingListComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      PackingListComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PackingListModule { }
