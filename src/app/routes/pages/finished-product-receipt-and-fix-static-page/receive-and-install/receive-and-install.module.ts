import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FinishedPanelBoardModule } from '../finished-panel-board/finished-panel-board.module'
import { ListEnclModule } from './list/list-encl/list-encl.module'
import { ListMatModule } from './list/list-mat/list-mat.module'
import { ListStrucModule } from './list/list-struc/list-struc.module'
import { BoardStrucModule } from './board/board-struc/board-struc.module'
import { BoardEnclModule } from './board/board-encl/board-encl.module'
import { ReceiveAndInstallComponent } from './receive-and-install.component';

const COMPONENT_NOROUNT = [
];

@NgModule({
  imports: [
      SharedModule,
      FinishedPanelBoardModule,
      ListEnclModule,
      ListMatModule,
      ListStrucModule,
      BoardStrucModule,
      BoardEnclModule
  ],
  exports: [
      ReceiveAndInstallComponent
  ],
  declarations: [
      ...COMPONENT_NOROUNT,
      ReceiveAndInstallComponent
  ],
  entryComponents: COMPONENT_NOROUNT
})
export class ReceiveAndInstallModule { }
