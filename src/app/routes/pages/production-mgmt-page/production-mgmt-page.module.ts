import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectPlanDetailModule } from '../project-plan-page/project-plan-detail/project-plan-detail.module'
import { ProblemFeedbackMgmtPageModule } from '../problem-feedback-mgmt-page/problem-feedback-mgmt-page.module'
import { TaskAssignmentMgmtPageModule } from '../task-assignment-mgmt-page/task-assignment-mgmt-page.module'
import { ProductivityBoardModule } from './productivity-board/productivity-board.module'
import { ProductionMgmtPageComponent } from './production-mgmt-page.component'
// import { PrintLabelPageComponent } from '../print-label-page/print-label-page.component'
import { PrintLabelPageModule } from '../print-label-page/print-label-page.module'
// import { ProductivityStaticModule } from './productivity-static/productivity-static.module'
import { SiteDemandPlanModule } from './site-demand-plan/site-demand-plan.module'
import { ProcessBoardModule } from './process-board/process-board.module'

const COMPONENT_NOROUNT = [
  // PrintLabelPageComponent,
  ProductionMgmtPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    PrintLabelPageModule,
    // ProductivityStaticModule,
    ProjectPlanDetailModule,
    ProblemFeedbackMgmtPageModule,
    TaskAssignmentMgmtPageModule,
    ProductivityBoardModule,
    SiteDemandPlanModule,
    ProcessBoardModule,
    RouterModule.forChild([{ path: '', component: ProductionMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductionMgmtPageModule { }
