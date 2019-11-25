import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// import { RouterModule } from '@angular/router';
// import { FixStaticPageComponent } from './fix-static-page.component'

const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule
    // RouterModule.forChild([{ path: '', component: FixStaticPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FixStaticPageModule { }
