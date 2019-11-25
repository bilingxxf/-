import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ImplementPlanCreatePageComponent } from './implement-plan-create-page.component'

const COMPONENT_NOROUNT = [ImplementPlanCreatePageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ImplementPlanCreatePageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ImplementPlanCreatePageModule { }
