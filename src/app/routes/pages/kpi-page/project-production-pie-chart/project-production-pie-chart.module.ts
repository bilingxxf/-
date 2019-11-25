import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectProductionPieChartComponent } from './project-production-pie-chart.component'

const COMPONENT_NOROUNT = [
  ProjectProductionPieChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProjectProductionPieChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectProductionPieChartModule { }
