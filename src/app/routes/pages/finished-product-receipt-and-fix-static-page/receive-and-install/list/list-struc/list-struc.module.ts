import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListStrucComponent } from './list-struc.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ListStrucComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ListStrucComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ListStrucModule { }
