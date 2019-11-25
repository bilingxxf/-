import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { XtshPieChartComponent } from './xtsh-pie-chart.component'


const COMPONENT_NOROUNT = [
  XtshPieChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    XtshPieChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class XtshPieChartModule { }
