import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ColorBoxWrapComponent } from './color-box-wrap.component'
// import { MaterialDemandCreateModalComponent } from '../material-demand-create-modal/material-demand-create-modal.component'


const COMPONENT_NOROUNT = [
  ColorBoxWrapComponent
  // MaterialDemandCreateModalComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ColorBoxWrapComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ColorBoxWrapModule { }
