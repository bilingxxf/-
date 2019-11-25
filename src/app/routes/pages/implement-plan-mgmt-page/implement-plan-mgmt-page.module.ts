import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ImplementPlanMgmtPageComponent } from './implement-plan-mgmt-page.component'

const COMPONENT_NOROUNT = [ImplementPlanMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ImplementPlanMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ImplementPlanMgmtPageModule { }
