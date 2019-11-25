import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductionLineMgmtPageComponent } from './production-line-mgmt-page.component'
import { ProductionLineMgmtComponent } from './product-line-mgmt/production-line-page.component'
import { ProductionLineContainComponent } from './product-line-contain/production-line-contain-page.component'
import { ProductionLineSupplierComponent } from './product-line-supplier/production-line-supplier-page.component'
import { ProductionLineEdit } from './production-line-edit/production-line-edit.component'
import { FinalAssemblyDetailModule } from './final-assembly-detail/final-assembly-detail.module'
// import { ProductionContainLinDetail } from './production-contain-detail/production-contain-detail.component'
// import { from } from 'rxjs/observable/from';
// import { ProductionLineDetail } from './production-line-detail/production-line-detail.component'
const COMPONENT_NOROUNT = [
  ProductionLineMgmtComponent,
  ProductionLineContainComponent,
  ProductionLineSupplierComponent,
  ProductionLineMgmtPageComponent,
  ProductionLineEdit,
  // ProductionContainLinDetail
  // ProductionLineDetail
];

@NgModule({
  imports: [
    SharedModule,
    FinalAssemblyDetailModule,
    RouterModule.forChild([{ path: '', component: ProductionLineMgmtPageComponent }
  ])],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductionLineMgmtPageModule { }
