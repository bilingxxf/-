import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FixPlanDetailComponent } from './fix-plan-detail.component'
import { FixPlanDetailModalComponent } from '../fix-plan-detail-modal/fix-plan-detail-modal.component'


const COMPONENT_NOROUNT = [
  FixPlanDetailComponent,
  FixPlanDetailModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    FixPlanDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixPlanDetailModule { }
