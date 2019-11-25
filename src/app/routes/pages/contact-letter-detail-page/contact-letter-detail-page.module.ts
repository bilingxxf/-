import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContactLetterDetailPageComponent } from './contact-letter-detail-page.component'

const COMPONENT_NOROUNT = [ContactLetterDetailPageComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ContactLetterDetailPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ContactLetterDetailPageModule { }
