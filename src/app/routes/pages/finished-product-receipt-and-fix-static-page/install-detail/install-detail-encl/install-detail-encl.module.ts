import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InstallDetailEnclComponent } from './install-detail-encl.component';
import { DetailComponent } from './detail/detail.component';


const COMPONENT_NOROUNT = [
  DetailComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      InstallDetailEnclComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InstallDetailEnclComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InstallDetailEnclModule { }
