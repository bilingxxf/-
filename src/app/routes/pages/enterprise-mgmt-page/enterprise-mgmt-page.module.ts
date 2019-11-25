import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { EnterpriseMgmtPageComponent } from './enterprise-mgmt-page.component'

const COMPONENT_NOROUNT = [EnterpriseMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: EnterpriseMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class EnterpriseMgmtPageModule { }
