import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BoardStrucComponent } from './board-struc.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      BoardStrucComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      BoardStrucComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class BoardStrucModule { }
