import {
    NgModule
} from '@angular/core';
import {
    SharedModule
} from '@shared/shared.module';
import {
    InboundDetailComponent
} from './inbound-detail.component';
import { InboundStrucDetailModule } from './inbound-struc-detail/inbound-struc-detail.module'
import { InboundEnclDetailModule } from './inbound-encl-detail/inbound-encl-detail.module'
import { InboundMatDetailModule } from './inbound-mat-detail/inbound-mat-detail.module'


const COMPONENT_NOROUNT = [];

@NgModule({
    imports: [
        SharedModule,
        InboundStrucDetailModule,
        InboundEnclDetailModule,
        InboundMatDetailModule
    ],
    exports: [
        InboundDetailComponent
    ],
    declarations: [
        ...COMPONENT_NOROUNT,
        InboundDetailComponent,
        
    ],
    entryComponents: COMPONENT_NOROUNT
})
export class InboundDetailModule {}
