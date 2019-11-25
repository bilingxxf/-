import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InstallDetailStrucModule } from './install-detail-struc/install-detail-struc.module'
import { InstallDetailEnclModule } from './install-detail-encl/install-detail-encl.module'
import { InstallDetailComponent } from './install-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    InstallDetailStrucModule,
    InstallDetailEnclModule
  ],
  exports: [
      InstallDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InstallDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InstallDetailModule { }
