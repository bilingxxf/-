import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectSetupPieChartComponent } from './project-setup-pie-chart.component';


const COMPONENT_NOROUNT = [
  ProjectSetupPieChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProjectSetupPieChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectSetupPieChartModule { }
