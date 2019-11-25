import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { FinishedDailyDetailComponent } from './finished-daily-detail.component'
import { ReceiptDailyTableComponent } from '../finished-product-receipt-and-fix-static-page/receipt-daily-table/receipt-daily-table.component'
import { FinishedDetailTableComponent } from '../finished-product-receipt-and-fix-static-page/finished-detail-table/finished-detail-table.component'

const COMPONENT_NOROUNT = [
  FinishedDailyDetailComponent,
  ReceiptDailyTableComponent,
  FinishedDetailTableComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: FinishedDailyDetailComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FinishedDailyDetailModule { }
