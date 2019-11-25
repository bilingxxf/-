import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductSubcontractSummaryPageComponent } from './product-subcontract-summary-page.component'

const COMPONENT_NOROUNT = [
  ProductSubcontractSummaryPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductSubcontractSummaryPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductSubcontractSummaryPageModule { }
