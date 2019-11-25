import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { FixPlanPageComponent } from './fix-plan-page.component'
// import { FixColorBoxWrapComponent } from './fix-color-box-wrap/fix-color-box-wrap.component'


const COMPONENT_NOROUNT = [FixPlanPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FixPlanPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixPlanPageModule { }
