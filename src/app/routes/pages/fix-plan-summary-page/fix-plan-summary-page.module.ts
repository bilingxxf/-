import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { FixPlanSummaryPageComponent } from './fix-plan-summary-page.component'
import { FixPlanSummaryTableComponent } from './fix-plan-summary-table/fix-plan-summary-table.component'

const COMPONENT_NOROUNT = [
  FixPlanSummaryPageComponent,
  FixPlanSummaryTableComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FixPlanSummaryPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixPlanSummaryPageModule { }
