import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
// import { InspectionMgmtPageComponent } from './inspection-mgmt-page.component'

const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    // RouterModule.forChild([{ path: '', component: InspectionMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InspectionMgmtPageModule { }
