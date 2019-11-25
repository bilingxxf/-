import { NgModule, Optional, SkipSelf } from '@angular/core'
import { throwIfAlreadyLoaded } from './module-import-guard'
import { SERVICES } from '@core/services.constant'


@NgModule({
    providers: [
        ...SERVICES
    ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
