import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectPlanDetailModule } from './project-plan-detail/project-plan-detail.module'
import { MaterialDemandPageModule } from '../material-demand-page/material-demand-page.module'
import { FixColorBoxWrapModule } from '../fix-plan-page/fix-color-box-wrap/fix-color-box-wrap.module'
import { ProjectPlanPageComponent } from './project-plan-page.component'
import { FixPlanPageComponent } from '../fix-plan-page/fix-plan-page.component'
import { FixPlanDetailModule } from '../fix-plan-page/fix-plan-detail/fix-plan-detail.module'


const COMPONENT_NOROUNT = [
  ProjectPlanPageComponent, 
  FixPlanPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    ProjectPlanDetailModule,
    MaterialDemandPageModule,
    FixColorBoxWrapModule,
    FixPlanDetailModule,
    RouterModule.forChild([{ path: '', component: ProjectPlanPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectPlanPageModule { }
