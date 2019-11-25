import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { WarehousingMgmtPageComponent } from './warehousing-mgmt-page.component'
import { MonomerWarehousingComponent } from './monomer-warehousing/monomer-warehousing.component'


const COMPONENT_NOROUNT = [
  WarehousingMgmtPageComponent,
  MonomerWarehousingComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    WarehousingMgmtPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class WarehousingMgmtPageModule { }
