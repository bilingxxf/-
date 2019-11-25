import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductionLineDetail } from './production-line-detail.component'


const COMPONENT_NOROUNT = [
  ProductionLineDetail
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductionLineDetail }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductionLineDetailModule { }
