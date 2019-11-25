import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SecurityLogPageComponent } from './security-log-page.component'
import { SecurityLogCModalComponent } from './security-log-c-modal/security-log-c-modal.component'
import { SecurityLogDetailModalComponent } from './security-log-detail-modal/security-log-detail-modal.component'


const COMPONENT_NOROUNT = [
  SecurityLogPageComponent,
  SecurityLogCModalComponent,
  SecurityLogDetailModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    SecurityLogPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class SecurityLogPageModule { }
