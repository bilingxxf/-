import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PlanMgmtComponent } from './plan-mgmt.component'
import { PlanListModalComponent } from './plan-list-modal/plan-list-modal.component'


const COMPONENT_NOROUNT = [
  PlanMgmtComponent,
  PlanListModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    PlanMgmtComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PlanMgmtModule { }
