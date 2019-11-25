import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectMgmtPageComponent } from './project-mgmt-page.component';
import { ProjectMgmtTabPageComponent } from './project-mgmt-tab-page/project-tab-page.component'
import { RouterModule } from '@angular/router';
import { from } from 'rxjs/observable/from';
import { ProjectMgmtTablePageComponent } from './project-mgmt-table-page/project-table-page.component'
import { ProjectWeekTablePageComponent } from './project-week-table-page/project-week-table.component'
import { ProjectMonthTablePageComponent } from './project-month-table-page/project-month-table.component'
import { ProjectGroupTablePageComponent } from './project-group-table-page/project-group-table.component'
import { DashboardModule } from '../../dashboard/dashboard.module'
const COMPONENT_NOROUNT = [ProjectMgmtPageComponent, 
                          ProjectMgmtTabPageComponent,
                          ProjectMgmtTablePageComponent, 
                          ProjectWeekTablePageComponent,
                          ProjectMonthTablePageComponent,
                          ProjectGroupTablePageComponent ];

@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    RouterModule.forChild([{ path: '', component: ProjectMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectMgmtPageModule { }
