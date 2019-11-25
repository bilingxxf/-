import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component'


const COMPONENT_NOROUNT = [
  ProfileComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProfileModule { }
