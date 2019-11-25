import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductLabelMatComponent } from './product-label-mat.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ProductLabelMatComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProductLabelMatComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductLabelMatModule { }
