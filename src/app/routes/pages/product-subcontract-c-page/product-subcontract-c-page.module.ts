import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductSubcontractCPageComponent } from './product-subcontract-c-page.component'


const COMPONENT_NOROUNT = [
  ProductSubcontractCPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductSubcontractCPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductSubcontractCPageModule { }
