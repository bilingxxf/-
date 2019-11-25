import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
// delon
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra'
import { AlainThemeModule } from '@delon/theme'
import { AlainACLModule } from '@delon/acl'
import { NgxQRCodeModule } from 'ngx-qrcode2'
import { ZORROMODULES, ABCMODULES } from '../delon.module'

// region: third libs
import { CountdownModule } from 'ngx-countdown'
import { NzSchemaFormModule } from 'nz-schema-form'
import { NgxEditorModule } from 'ngx-editor'
import { LightboxModule } from 'ngx-lightbox'
import { UploadFilesComponent } from './component/upload-files/upload-files.component'
// import { ProjectCStepsComponent } from './component/project-c-steps/project-c-steps.component'
import { HasPermissionDirective } from './directive/has-permission.directive'
import { Directives } from './directive/directives.constant'
import { PIPES } from '@shared/pipes/pipes.constant'
import { ProjectProHeaderComponent } from './component/project-pro-header/project-pro-header.component'
import { MultiColorBoxComponent } from './component/multi-color-box/multi-color-box.component'

import { MultiColorBoxComponent1 } from './component/multi-color-box1/multi-color-box1.component'
import { MultiColorBoxListComponent } from '@shared/component/multi-color-box-list/multi-color-box-list.component'
// import { ProjectActionsComponent } from './component/project-actions/project-actions.component'
import { FooterApprovalComponent } from './component/footer-approval/footer-approval.component'
import { TreeModule } from 'angular-tree-component';
// import { VerticalTabsComponent } from './component/vertical-tabs/vertical-tabs.component';
// import { VerticalTabComponent } from './component/vertical-tab/vertical-tab.component';
import { TagComponent } from './component/tag/tag.component';
import { PopupComponent } from './component/popup/popup.component';

import { LineBoardComponent } from './../routes/pages/inbound-and-outbound-mgmt-page/line-board/line-board.component'

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!

const THIRDMODULES = [
    CountdownModule,
    NzSchemaFormModule,
    LightboxModule,
    NgxEditorModule,
    TreeModule,
    FullCalendarModule
]
// endregion

// region: your componets & directives
const COMPONENTS = [
    UploadFilesComponent,
    // ProjectCStepsComponent,
    ProjectProHeaderComponent,
    MultiColorBoxComponent,
    MultiColorBoxListComponent,
    // ProjectActionsComponent,
    FooterApprovalComponent,
    // VerticalTabsComponent,
    // VerticalTabComponent,
    LineBoardComponent
]
const DIRECTIVES = Directives
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule.forChild(),
        ...ABCMODULES,
        AlainACLModule,
        NgxQRCodeModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES,
        UploadFilesComponent,
        HasPermissionDirective,
        TagComponent,
        PopupComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxQRCodeModule,
        RouterModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainACLModule,
        AlainThemeModule,
        TagComponent,
        PopupComponent,

        ...ABCMODULES,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        ...PIPES
    ]
})
export class SharedModule { }
