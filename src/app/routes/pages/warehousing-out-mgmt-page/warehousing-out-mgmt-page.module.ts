import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { WarehousingOutMgmtPageComponent } from './warehousing-out-mgmt-page.component'
import { MonomerWarehousingOutComponent } from './monomer-warehousing-out/monomer-warehousing-out.component'

const COMPONENT_NOROUNT = [
  WarehousingOutMgmtPageComponent,
  MonomerWarehousingOutComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: WarehousingOutMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class WarehousingOutMgmtPageModule { }
