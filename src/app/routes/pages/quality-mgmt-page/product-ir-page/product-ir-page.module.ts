import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductIrPageComponent } from './product-ir-page.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports:[
    ProductIrPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProductIrPageComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductIrPageModule { }
