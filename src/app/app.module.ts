
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core'
import { HttpModule } from '@angular/http'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { DelonModule } from './delon.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'
import { RoutesModule } from './routes/routes.module'
import { LayoutModule } from './layout/layout.module'
import { StartupService } from '@core/startup/startup.service'


import zh from '@angular/common/locales/zh';
import {registerLocaleData} from '@angular/common';
registerLocaleData(zh);


// JSON-Schema form
import { JsonSchemaModule } from '@shared/json-schema/json-schema.module'
import { Modals } from './modals/modals.constant'

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.load()
}

@NgModule({
    declarations: [
        AppComponent,
        ...Modals
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        HttpClientModule,
        DelonModule.forRoot(),
        CoreModule,
        SharedModule,
        LayoutModule,
        JsonSchemaModule,
        RoutesModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        },
        StartupService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ...Modals
    ]
})
export class AppModule { }
