import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinalAssemblyDetailComponent } from './final-assembly-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    FinalAssemblyDetailComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      FinalAssemblyDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class  FinalAssemblyDetailModule  { }
