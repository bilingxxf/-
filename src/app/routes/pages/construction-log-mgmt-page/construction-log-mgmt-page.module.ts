import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ConstructionLogMgmtPageComponent } from './construction-log-mgmt-page.component'
import { ConstructionLogCreateModalComponent } from './construction-log-create-modal/construction-log-create-modal.component'
import { ConstructionLogDetailModalComponent } from './construction-log-detail-modal/construction-log-detail-modal.component'
import { ConstructionLogExportModalComponent } from './construction-log-export-modal/construction-log-export-modal.component'


const COMPONENT_NOROUNT = [
  ConstructionLogMgmtPageComponent,
  ConstructionLogCreateModalComponent,
  ConstructionLogDetailModalComponent,
  ConstructionLogExportModalComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ConstructionLogMgmtPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ConstructionLogMgmtPageModule { }
