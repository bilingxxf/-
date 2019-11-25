import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinalAssemblyContainDetailComponent } from './final-assembly-contain-detail.component';

const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    FinalAssemblyContainDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      FinalAssemblyContainDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class  FinalAssemblyContainDetailModule  { }
