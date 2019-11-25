import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContactLetterMgmtPageComponent } from './contact-letter-mgmt-page.component'


const COMPONENT_NOROUNT = [ContactLetterMgmtPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ContactLetterMgmtPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ContactLetterMgmtPageModule { }
