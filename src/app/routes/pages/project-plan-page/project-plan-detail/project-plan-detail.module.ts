import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectPlanDetailComponent } from './project-plan-detail.component'


const COMPONENT_NOROUNT = [
  ProjectPlanDetailComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProjectPlanDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectPlanDetailModule { }
