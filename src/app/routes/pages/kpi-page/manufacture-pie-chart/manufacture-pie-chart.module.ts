import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ManufacturePieChartComponent } from './manufacture-pie-chart.component'


const COMPONENT_NOROUNT = [
  ManufacturePieChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ManufacturePieChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ManufacturePieChartModule { }
