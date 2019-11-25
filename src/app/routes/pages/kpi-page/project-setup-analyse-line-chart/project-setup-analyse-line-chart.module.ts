import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectSetupAnalyseLineChartComponent } from './project-setup-analyse-line-chart.component'


const COMPONENT_NOROUNT = [
  ProjectSetupAnalyseLineChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProjectSetupAnalyseLineChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectSetupAnalyseLineChartModule { }
