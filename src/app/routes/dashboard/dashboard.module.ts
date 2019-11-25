import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CompanyMonthlyManufactureLineChartModule } from './company-monthly-manufacture-line-chart/company-monthly-manufacture-line-chart.module'
import { XtshPieChartModule } from '../pages/kpi-page/xtsh-pie-chart/xtsh-pie-chart.module'
import { ProjectProductionPieChartModule } from '../pages/kpi-page/project-production-pie-chart/project-production-pie-chart.module'
import { ProjectProductionAnalyseLineChartModule } from '../pages/kpi-page/project-production-analyse-line-chart/project-production-analyse-line-chart.module'
import { ProjectSetupPieChartModule } from '../pages/kpi-page/project-setup-pie-chart/project-setup-pie-chart.module'
import { ProjectSetupAnalyseLineChartModule } from '../pages/kpi-page/project-setup-analyse-line-chart/project-setup-analyse-line-chart.module'
import { ManufacturePieChartModule } from '../pages/kpi-page/manufacture-pie-chart/manufacture-pie-chart.module'
import { DashboardComponent } from './dashboard.component'
import { CompanyInvoicePieChartComponent } from './company-invoice-pie-chart/company-invoice-pie-chart.component'
import { CompanyManufacturePieChartComponent } from './company-manufacture-pie-chart/company-manufacture-pie-chart.component'
// import { CompanyMonthlyManufactureLineChartComponent } from './company-monthly-manufacture-line-chart/company-monthly-manufacture-line-chart.component'
import { CompanyMonthlyReceiptLineChartComponent } from './company-monthly-receipt-line-chart/company-monthly-receipt-line-chart.component'
import { XtshMonthlyLineChartComponent } from '../pages/kpi-page/xtsh-monthly-line-chart/xtsh-monthly-line-chart.component';

const COMPONENT_NOROUNT = [
  DashboardComponent,
  CompanyInvoicePieChartComponent,
  CompanyManufacturePieChartComponent,
  CompanyMonthlyReceiptLineChartComponent,
  XtshMonthlyLineChartComponent
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
    // RouterModule.forChild([{ path: '', component: DashboardComponent }])
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class DashboardModule { }
