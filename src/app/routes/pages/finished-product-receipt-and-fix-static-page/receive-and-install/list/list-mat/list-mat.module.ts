import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListMatComponent } from './list-mat.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ListMatComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ListMatComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ListMatModule { }
