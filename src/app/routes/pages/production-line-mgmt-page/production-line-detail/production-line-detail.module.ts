import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductionLineDetail } from './production-line-detail.component'
import { FinalAssemblyDetailModule } from '../final-assembly-detail/final-assembly-detail.module'


const COMPONENT_NOROUNT = [
  ProductionLineDetail
];

@NgModule({
  imports: [
    SharedModule,
    FinalAssemblyDetailModule,
    RouterModule.forChild([{ path: '', component: ProductionLineDetail }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductionLineDetailModule { }
