import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InstallDetailStrucComponent } from './install-detail-struc.component';
import { DetailComponent } from './detail/detail.component'


const COMPONENT_NOROUNT = [
  DetailComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      InstallDetailStrucComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InstallDetailStrucComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InstallDetailStrucModule { }
