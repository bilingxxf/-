import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductLabelEnclComponent } from './product-label-encl.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ProductLabelEnclComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProductLabelEnclComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductLabelEnclModule { }
