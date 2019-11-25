import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserRegisterResultComponent } from './register-result.component'

const COMPONENT_NOROUNT = [
  UserRegisterResultComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: UserRegisterResultComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class RegisterResultModule { }
