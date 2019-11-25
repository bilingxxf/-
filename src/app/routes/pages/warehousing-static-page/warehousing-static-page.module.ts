import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { WarehousingStaticPageComponent } from './warehousing-static-page.component'
import { WarehousingStaticEnclosureComponent } from './warehousing-static-enclosure/warehousing-static-enclosure.component'
import { WarehousingStaticStructureComponent } from './warehousing-static-structure/warehousing-static-structure.component'

const COMPONENT_NOROUNT = [
  WarehousingStaticPageComponent,
  WarehousingStaticEnclosureComponent,
  WarehousingStaticStructureComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: WarehousingStaticPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class WarehousingStaticPageModule { }
