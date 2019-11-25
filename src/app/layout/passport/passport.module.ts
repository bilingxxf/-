import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
// import { LayoutPassportComponent } from './passport.component'

const COMPONENT_NOROUNT = [
  // LayoutPassportComponent
];

@NgModule({
  imports: [
    SharedModule,
    // RouterModule.forChild([{ path: '', component: LayoutPassportComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PassportModule { }
