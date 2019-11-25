import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FactoryLogisticsComponent } from './factory-logistics.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
      FactoryLogisticsComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      FactoryLogisticsComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FactoryLogisticsModule { }
