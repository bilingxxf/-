import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InboundStrucDetailComponent } from './inbound-struc-detail.component';
import { CarInListDetailModalComponent } from '../../../cargo-list-mgmt-page/carIn-list-detail-modal/cargo-list-detail-modal.component'
import { CarInListDetailByUserModalComponent } from '../../../cargo-list-mgmt-page/carIn-list-detail-by-user-modal/carIn-list-detail-by-user-modal.component'


const COMPONENT_NOROUNT = [
  CarInListDetailModalComponent,
  CarInListDetailByUserModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      InboundStrucDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      InboundStrucDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class InboundStrucDetailModule { }
