import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TaskBoxWrap } from './task-box-wrap.component'


const COMPONENT_NOROUNT = [
  TaskBoxWrap
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    TaskBoxWrap
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class TaskBoxWrapModule { }
