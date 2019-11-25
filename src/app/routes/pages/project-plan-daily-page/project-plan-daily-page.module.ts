import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectPlanDailyPageComponent } from './project-plan-daily-page.component'
import { ProjectPlanDailyModelComponent } from './project-plan-daily-model/project-plan-daily-model.component'


const COMPONENT_NOROUNT = [
  ProjectPlanDailyPageComponent,
  ProjectPlanDailyModelComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProjectPlanDailyPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectPlanDailyPageModule { }
