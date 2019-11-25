import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductLabelComponent } from './product-label.component';
import { ProductLabelStrucModule } from './product-label-struc/product-label-struc.module'
import { ProductLabelEnclModule } from './product-label-encl/product-label-encl.module'
import { ProductLabelMatModule } from './product-label-mat/product-label-mat.module'


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ProductLabelStrucModule,
    ProductLabelEnclModule,
    ProductLabelMatModule
  ],
  exports: [
      ProductLabelComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProductLabelComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductLabelModule { }
