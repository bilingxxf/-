import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FixColorBoxWrapComponent } from './fix-color-box-wrap.component'
import { FixPlanCreateModalComponent } from '../fix-plan-create-modal/fix-plan-create-modal.component'

const COMPONENT_NOROUNT = [
  FixColorBoxWrapComponent,
  FixPlanCreateModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    FixColorBoxWrapComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixColorBoxWrapModule { }
