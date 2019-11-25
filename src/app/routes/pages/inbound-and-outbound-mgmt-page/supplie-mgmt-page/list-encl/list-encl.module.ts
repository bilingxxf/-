import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListEnclComponent } from './list-encl.component';
import { DetailEnclComponent } from '../detail-encl/detail-encl.component';


const COMPONENT_NOROUNT = [
  DetailEnclComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      ListEnclComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ListEnclComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ListEnclModule { }
