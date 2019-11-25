import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductLabelStrucComponent } from './product-label-struc.component';
// import { ComponentLabelPreviewModalComponent } from '../../../print-label-page/component-label-preview-modal/component-label-preview-modal.component'

const COMPONENT_NOROUNT = [
  // ComponentLabelPreviewModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ProductLabelStrucComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProductLabelStrucComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductLabelStrucModule { }
