import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { CargoListMgmtPageComponent } from './cargo-list-mgmt-page.component'


const COMPONENT_NOROUNT = [CargoListMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CargoListMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class CargoListMgmtPageModule { }
