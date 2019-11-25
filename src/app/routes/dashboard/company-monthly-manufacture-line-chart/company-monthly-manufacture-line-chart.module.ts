import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CompanyMonthlyManufactureLineChartComponent } from './company-monthly-manufacture-line-chart.component'

const COMPONENT_NOROUNT = [
  CompanyMonthlyManufactureLineChartComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    CompanyMonthlyManufactureLineChartComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class CompanyMonthlyManufactureLineChartModule { }
