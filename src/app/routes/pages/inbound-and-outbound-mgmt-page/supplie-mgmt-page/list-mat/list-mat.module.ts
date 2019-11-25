import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListMatComponent } from './list-mat.component';
import { DetailMatComponent } from '../detail-mat/detail-mat.component';


const COMPONENT_NOROUNT = [
  DetailMatComponent
];

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
