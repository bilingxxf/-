import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProblemFeedbackMgmtPageModule } from '../problem-feedback-mgmt-page/problem-feedback-mgmt-page.module'
import { ProductIrPageModule } from './product-ir-page/product-ir-page.module'
import { QualityMgmtPageComponent } from './quality-mgmt-page.component'
import { QualityBoardPageModule } from '../quality-board-page/quality-board-page.module'


const COMPONENT_NOROUNT = [
  QualityMgmtPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    QualityBoardPageModule,
    ProblemFeedbackMgmtPageModule,
    ProductIrPageModule,
    RouterModule.forChild([{ path: '', component: QualityMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class QualityMgmtPageModule { }
