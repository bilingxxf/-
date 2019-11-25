import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BoardEnclComponent } from './board-encl.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      BoardEnclComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      BoardEnclComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class BoardEnclModule { }
