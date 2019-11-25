import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SiteDemandPlanComponent } from './site-demand-plan.component';
import { StructuralDemandDetailComponent } from './structural-demand-detail/structural-demand-detail.component';
import { MaterialDemandDetailComponent } from './material-demand-detail/material-demand-detail.component';
import { EnclosureDemandDetailComponent } from './enclosure-demand-detail/enclosure-demand-detail.component';


const COMPONENT_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    SiteDemandPlanComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      SiteDemandPlanComponent,
      StructuralDemandDetailComponent,
      MaterialDemandDetailComponent,
      EnclosureDemandDetailComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class SiteDemandPlanModule { }
