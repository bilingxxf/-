import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductivityBoardComponent } from './productivity-board.component'
import { Custom } from '../productivity-static/productivity-static-table-mode/custom/custom.component';
import { ProdReportEnclComponent } from './prod-report-encl/prod-report-encl.component'


const COMPONENT_NOROUNT = [
  ProductivityBoardComponent,
  Custom
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ProductivityBoardComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ProdReportEnclComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductivityBoardModule { }
