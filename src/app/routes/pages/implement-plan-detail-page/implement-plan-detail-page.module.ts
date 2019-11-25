import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ImplementPlanDetailPageComponent } from './implement-plan-detail-page.component'

const COMPONENT_NOROUNT = [ImplementPlanDetailPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ImplementPlanDetailPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ImplementPlanDetailPageModule { }
