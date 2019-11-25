import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CompanyMonthlyManufactureLineChartModule } from '../../dashboard/company-monthly-manufacture-line-chart/company-monthly-manufacture-line-chart.module'
import { XtshPieChartModule } from './xtsh-pie-chart/xtsh-pie-chart.module'
import { ProjectProductionPieChartModule } from './project-production-pie-chart/project-production-pie-chart.module'
import { ProjectProductionAnalyseLineChartModule } from './project-production-analyse-line-chart/project-production-analyse-line-chart.module'
import { ProjectSetupPieChartModule } from './project-setup-pie-chart/project-setup-pie-chart.module'
import { ProjectSetupAnalyseLineChartModule } from './project-setup-analyse-line-chart/project-setup-analyse-line-chart.module'
import { ManufacturePieChartModule } from './manufacture-pie-chart/manufacture-pie-chart.module'
import { KpiPageComponent } from './kpi-page.component'
import { ProjectStepBarChartComponent } from './project-step-bar-chart/project-step-bar-chart.component'
import { ReceiptAndInvoicePieChartComponent } from './receipt-and-invoice-pie-chart/receipt-and-invoice-pie-chart.component'
import { ReceiptMonthlyDataLineChartComponent } from './receipt-monthly-data-line-chart/receipt-monthly-data-line-chart.component'
import { WeeklyPlansBarChartComponent } from './weekly-plans-bar-chart/weekly-plans-bar-chart.component'
import { MonthPlansBarChartComponent } from './month-plans-bar-chart/month-plans-bar-chart.component'

const COMPONENT_NOROUNT = [
  KpiPageComponent,
  ProjectStepBarChartComponent,
  ReceiptAndInvoicePieChartComponent,
  ReceiptMonthlyDataLineChartComponent,
  WeeklyPlansBarChartComponent,
  MonthPlansBarChartComponent
];

@NgModule({
  imports: [
    SharedModule,
    CompanyMonthlyManufactureLineChartModule,
    XtshPieChartModule,
    ProjectProductionPieChartModule,
    ProjectProductionAnalyseLineChartModule,
    ProjectSetupPieChartModule,
    ProjectSetupAnalyseLineChartModule,
    ManufacturePieChartModule,
    RouterModule.forChild([{ path: '', component: KpiPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class KpiPageModule { }
