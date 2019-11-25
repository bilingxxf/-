import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AllotDetailComponent } from './allot-detail.component';


const COMPONENT_NOROUNT = [AllotDetailComponent];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    AllotDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      AllotDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class AllotDetailModule { }
