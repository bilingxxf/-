import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProjectInfoCUComponent } from './project-info-c-u/project-info-c-u.component'
// import { ProjectInfoCPageComponent } from './project-info-c-page/project-info-c-page.component'
import { ProjectCustomerCUComponent } from './project-customer-c-u/project-customer-c-u.component'
import { ProjectCustomerCPageComponent } from './project-customer-c-page/project-customer-c-page.component'
import { ProjectCPageComponent } from './project-c-page.component';
import { ProjectCStepsComponent } from '../../../shared/component/project-c-steps/project-c-steps.component'


const COMPONENT_NOROUNT = [
  ProjectCPageComponent,
  ProjectInfoCUComponent,
  ProjectCustomerCUComponent,
  ProjectCustomerCPageComponent,
  ProjectCStepsComponent
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProjectCPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectCPageModule { }
