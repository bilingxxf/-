import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProjectDetailPageComponent } from './project-detail-page.component';
import { RouterModule } from '@angular/router';
import { ProjectInfoDetailComponent } from './project-info-detail/project-info-detail.component';
import { ProjectCustomerDetailComponent } from './project-customer-detail/project-customer-detail.component';
import { ProjectExportPageDetailComponent } from './project-exportpage-detail/project-exportpage-detail.component'

const COMPONENT_NOROUNT = [ProjectDetailPageComponent, ProjectInfoDetailComponent, ProjectCustomerDetailComponent, ProjectExportPageDetailComponent];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ProjectDetailPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProjectDetailPageModule { }
