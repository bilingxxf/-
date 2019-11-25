import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentTableComponent } from './component-table.component'


const COMPONENT_NOROUNT = [
  ComponentTableComponent
];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    ComponentTableComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ComponentTableModule { }
