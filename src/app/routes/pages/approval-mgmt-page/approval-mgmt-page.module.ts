import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApprovalMgmtPageComponent } from './approval-mgmt-page.component'


const COMPONENT_NOROUNT = [ApprovalMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ApprovalMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ApprovalMgmtPageModule { }
