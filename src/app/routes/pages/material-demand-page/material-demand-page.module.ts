import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
// import { RouterModule } from '@angular/router';
import { ColorBoxWrapModule } from './color-box-wrap/color-box-wrap.module'
import { MaterialDemandPageComponent} from './material-demand-page.component'
import { MaterialDemandCreateModalComponent } from './material-demand-create-modal/material-demand-create-modal.component'

const COMPONENT_NOROUNT = [
  MaterialDemandPageComponent,
  MaterialDemandCreateModalComponent
];

@NgModule({
  imports: [
    SharedModule,
    ColorBoxWrapModule
    // RouterModule.forChild([{ path: '', component: MaterialDemandPageComponent }])
  ],
  exports: [
    MaterialDemandPageComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class MaterialDemandPageModule { }
