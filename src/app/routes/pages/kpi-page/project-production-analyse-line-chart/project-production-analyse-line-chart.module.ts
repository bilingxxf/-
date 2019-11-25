import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectProductionAnalyseLineChartComponent } from './project-production-analyse-line-chart.component'


const COMPONENT_NOROUNT = [
  ProjectProductionAnalyseLineChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProjectProductionAnalyseLineChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectProductionAnalyseLineChartModule { }
