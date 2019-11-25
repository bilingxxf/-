import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import {  ProductionContainLinDetail } from './production-contain-detail.component'
import { FinalAssemblyContainDetailModule } from '../final-assembly-contain-detail/final-assembly-contain-detail.module'


const COMPONENT_NOROUNT = [
  ProductionContainLinDetail
];

@NgModule({
  imports: [
    SharedModule,
    FinalAssemblyContainDetailModule,
    RouterModule.forChild([{ path: '', component:  ProductionContainLinDetail }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class  ProductionContainLinDetailModule { }
