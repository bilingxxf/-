import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProblemFeedbackMgmtPageModule } from '../problem-feedback-mgmt-page/problem-feedback-mgmt-page.module'
import { InspectionsMgmtPageComponent } from './inspections-mgmt-page.component'
import { InspectionMgmtPageComponent } from '../inspection-mgmt-page/inspection-mgmt-page.component'

const COMPONENT_NOROUNT = [
  InspectionsMgmtPageComponent,
  InspectionMgmtPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    ProblemFeedbackMgmtPageModule,
    RouterModule.forChild([{ path: '', component: InspectionsMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InspectionsMgmtPageModule { }
