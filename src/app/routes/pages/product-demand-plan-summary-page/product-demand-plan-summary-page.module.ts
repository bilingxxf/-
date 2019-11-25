import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDemandPlanSummaryPageComponent } from './product-demand-plan-summary-page.component'
import { ProductDemandPlanSummaryTableComponent } from './product-demand-plan-summary-table/product-demand-plan-summary-table.component'


const COMPONENT_NOROUNT = [
  ProductDemandPlanSummaryPageComponent,
  ProductDemandPlanSummaryTableComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductDemandPlanSummaryPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductDemandPlanSummaryPageModule { }
