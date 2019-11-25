import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ProductivityStaticComponent } from './productivity-static.component'
import { ProductivityStaticTableModeModule } from './productivity-static-table-mode/productivity-static-table-mode.module'
import { ProductivityStaticTileModeComponent } from './productivity-static-tile-mode/productivity-static-tile-mode.component'


const COMPONENT_NOROUNT = [ProductivityStaticComponent, ProductivityStaticTileModeComponent];

@NgModule({
  imports: [
    SharedModule,
    ProductivityStaticTableModeModule,
  ],
  exports: [
    ProductivityStaticComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ProductivityStaticModule { }
