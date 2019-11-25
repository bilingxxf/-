import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { TotalProgressPageComponent } from './total-progress-page.component'
import { TotalProgressTableComponent } from './total-progress-table/total-progress-table.component'
import { BlockUIModule } from 'ng-block-ui';

const COMPONENT_NOROUNT = [
  TotalProgressPageComponent,
  TotalProgressTableComponent
];

@NgModule({
  imports: [
    SharedModule,
    BlockUIModule.forRoot(),
    RouterModule.forChild([{ path: '', component: TotalProgressPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class TotalProgressPageModule { }
