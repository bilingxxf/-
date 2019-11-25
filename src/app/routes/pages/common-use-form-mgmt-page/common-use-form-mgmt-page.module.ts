import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonUseFormMgmtPageComponent } from './common-use-form-mgmt-page.component'


const COMPONENT_NOROUNT = [CommonUseFormMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CommonUseFormMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class CommonUseFormMgmtPageModule { }
