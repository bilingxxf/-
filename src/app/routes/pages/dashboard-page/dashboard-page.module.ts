import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DashboardPageComponent } from './dashboard-page.component';
import { DashboardModule } from '../../dashboard/dashboard.module'
import { RouterModule } from '@angular/router';

const COMPONENT_NOROUNT = [DashboardPageComponent];

@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    RouterModule.forChild([{ path: '', component: DashboardPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      DashboardPageComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class DashboardPageModule { }
