import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { PermissionManagementPageComponent } from './permission-management-page.component'


const COMPONENT_NOROUNT = [
  PermissionManagementPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: PermissionManagementPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class PermissionManagementPageModule { }
