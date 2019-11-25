import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// import { RouterModule } from '@angular/router';
import { TaskBoxWrapModule } from './task-box-wrap/task-box-wrap.module'
import { TaskListModule } from './task-list/task-list.module'
import { AllotDetailModule } from './allot-detail/allot-detail.module'
import { AllotDetailCalendarModule } from './allot-detail-calendar/allot-detail-calendar.module'
import { TaskAssignmentMgmtPageComponent } from './task-assignment-mgmt-page.component'
import { TaskPopup } from './task-popup/task-popup.component'
// import { BlockUIModule } from 'ng-block-ui';

const COMPONENT_NOROUNT = [
  TaskAssignmentMgmtPageComponent,
  TaskPopup
];

@NgModule({
  imports: [
    SharedModule,
    TaskBoxWrapModule,
    TaskListModule,
    AllotDetailModule,
    AllotDetailCalendarModule
    // BlockUIModule.forRoot()
    // RouterModule.forChild([{ path: '', component: TaskAssignmentMgmtPageComponent }])
  ],
  exports: [
    TaskAssignmentMgmtPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class TaskAssignmentMgmtPageModule { }
