import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductSubcontractMgmtPageComponent } from './product-subcontract-mgmt-page.component'

const COMPONENT_NOROUNT = [ProductSubcontractMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductSubcontractMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductSubcontractMgmtPageModule { }
