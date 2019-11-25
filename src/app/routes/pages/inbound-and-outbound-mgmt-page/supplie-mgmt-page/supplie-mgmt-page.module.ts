import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListEnclModule } from './list-encl/list-encl.module'
import { ListMatModule } from './list-mat/list-mat.module'
import { SupplieMgmtPageComponent } from './supplie-mgmt-page.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    ListEnclModule,
    ListMatModule
  ],
  exports: [
    SupplieMgmtPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      SupplieMgmtPageComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class SupplieMgmtPageModule { }
