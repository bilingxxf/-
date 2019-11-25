import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ApprovalHistoryComponent } from './approval-history.component'


const COMPONENT_NOROUNT = [ApprovalHistoryComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ApprovalHistoryComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ApprovalHistoryModule { }
