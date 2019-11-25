import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { BusinessEntryPageComponent } from './business-entry-page.component'
import { EnclosureBusinessEntryTableComponent } from './enclosure-business-entry-table/enclosure-business-entry-table.component'
import { ComponentBusinessEntryTableComponent } from './component-business-entry-table/component-business-entry-table.component'


const COMPONENT_NOROUNT = [
  BusinessEntryPageComponent,
  EnclosureBusinessEntryTableComponent,
  ComponentBusinessEntryTableComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: BusinessEntryPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class BusinessEntryPageModule { }
