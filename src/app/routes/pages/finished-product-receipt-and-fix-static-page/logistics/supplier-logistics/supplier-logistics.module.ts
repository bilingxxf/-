import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SupplierLogisticsComponent } from './supplier-logistics.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      SupplierLogisticsComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      SupplierLogisticsComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class SupplierLogisticsModule { }
