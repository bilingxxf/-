import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReceiptPanelModule } from './receipt-panel/receipt-panel.module'
import { FixPanelModule } from './fix-panel/fix-panel.module'
import { ProductLabelModule } from './product-label/product-label.module'
import { ReceiveAndInstallModule } from './receive-and-install/receive-and-install.module'
import { LogisticsModule } from './logistics/logistics.module'
import { InstallDetailModule } from './install-detail/install-detail.module'
import { FinishedProductReceiptAndFixStaticPageComponent } from './finished-product-receipt-and-fix-static-page.component'
import { FinishedMgmtPageComponent } from './finished-mgmt-page/finished-mgmt-page.component'
// import { ReceiptPanelComponent } from './receipt-panel/receipt-panel.component'
// import { FixPanelComponent } from './fix-panel/fix-panel.component'
import { FixStaticPageComponent } from '../fix-static-page/fix-static-page.component'

const COMPONENT_NOROUNT = [
  FinishedProductReceiptAndFixStaticPageComponent,
  
  FinishedMgmtPageComponent,
  // ReceiptPanelComponent,
  // FixPanelComponent,
  
  FixStaticPageComponent
];

@NgModule({
  imports: [
    SharedModule,
    LogisticsModule,
    ReceiptPanelModule,
    FixPanelModule,
    ProductLabelModule,
    ReceiveAndInstallModule,
    InstallDetailModule,
    RouterModule.forChild([{ path: '', component: FinishedProductReceiptAndFixStaticPageComponent }])
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class FinishedProductReceiptAndFixStaticPageModule { }
