import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaskListComponent } from './task-list.component';
import { BlockUIModule } from 'ng-block-ui';


const COMPONENT_NOROUNT = [
  TaskListComponent
];

@NgModule({
  imports: [
    SharedModule,
    BlockUIModule.forRoot()
  ],
  exports: [
    TaskListComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      TaskListComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class TaskListModule { }
