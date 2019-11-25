import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProblemFeedbackMgmtPageModule } from '../problem-feedback-mgmt-page/problem-feedback-mgmt-page.module'
import { ConstructionLogMgmtPageModule } from '../construction-log-mgmt-page/construction-log-mgmt-page.module'
import { SecurityLogPageModule } from '../security-log-page/security-log-page.module'
import { RiskControlModule } from './risk-control/risk-control.module'
import { ConstructionMaterialPageComponent } from './construction-material-page.component'
import { QualityAndSecurityMgmtComponent } from './quality-and-security-mgmt/quality-and-security-mgmt.component'
import { ImageProgressPageComponent } from '../image-progress-page/image-progress-page.component'

const COMPONENT_NOROUNT = [
  ConstructionMaterialPageComponent,
  QualityAndSecurityMgmtComponent,
  ImageProgressPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    ProblemFeedbackMgmtPageModule,
    ConstructionLogMgmtPageModule,
    SecurityLogPageModule,
    RiskControlModule,
    RouterModule.forChild([{ path: '', component: ConstructionMaterialPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ConstructionMaterialPageModule { }
