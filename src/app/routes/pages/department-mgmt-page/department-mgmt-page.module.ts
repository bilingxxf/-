import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { DepartmentMgmtPageComponent } from './department-mgmt-page.component'

const COMPONENT_NOROUNT = [DepartmentMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: DepartmentMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class DepartmentMgmtPageModule { }
