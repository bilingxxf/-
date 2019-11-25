import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RiskControlComponent } from './risk-control.component'
import { RiskControlUploadHistoryModalComponent } from './risk-control-upload-history-modal/risk-control-upload-history-modal.component'


const COMPONENT_NOROUNT = [
  RiskControlComponent,
  RiskControlUploadHistoryModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    RiskControlComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class RiskControlModule { }
