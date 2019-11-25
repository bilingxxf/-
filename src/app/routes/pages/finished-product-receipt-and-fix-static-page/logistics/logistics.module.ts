import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LogisticsComponent } from './logistics.component';
import { FactoryLogisticsModule } from './factory-logistics/factory-logistics.module'
import { SupplierLogisticsModule } from './supplier-logistics/supplier-logistics.module'
import { SupplieMgmtPageModule } from '../../inbound-and-outbound-mgmt-page/supplie-mgmt-page/supplie-mgmt-page.module'


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FactoryLogisticsModule,
    SupplierLogisticsModule,
    SupplieMgmtPageModule
  ],
  exports: [
      LogisticsComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      LogisticsComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class LogisticsModule { }
