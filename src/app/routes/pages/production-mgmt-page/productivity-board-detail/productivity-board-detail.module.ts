import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductivityBoardDetailComponent } from './productivity-board-detail.component'

const COMPONENT_NOROUNT = [
  ProductivityBoardDetailComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProductivityBoardDetailComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductivityBoardDetailModule { }
