import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProblemFeedbackMgmtPageComponent } from './problem-feedback-mgmt-page.component'
import { ProblemDetailModalComponent } from './problem-detail-modal/problem-detail-modal.component'


const COMPONENT_NOROUNT = [
  ProblemFeedbackMgmtPageComponent,
  ProblemDetailModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProblemFeedbackMgmtPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProblemFeedbackMgmtPageModule { }
