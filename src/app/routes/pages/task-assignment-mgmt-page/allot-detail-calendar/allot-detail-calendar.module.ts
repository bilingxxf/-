import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AllotDetailCalendarComponent } from './allot-detail-calendar.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    AllotDetailCalendarComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      AllotDetailCalendarComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class AllotDetailCalendarModule { }
