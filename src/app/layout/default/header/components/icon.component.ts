import { Component } from '@angular/core'
import { NzModalService } from 'ng-zorro-antd'
import { ContactLetterCreateModalComponent } from '../../../../modals/contact-letter-create-modal/contact-letter-create-modal.component'

@Component({
    selector: 'header-icon',
    template: `
    <nz-dropdown nzTrigger="click" nzPlacement="bottomRight" (nzVisibleChange)="change()">
        <div class="item" nz-dropdown>
            <i class="anticon anticon-appstore-o"></i>
        </div>
        <div nz-menu class="wd-xl animated jello">
            <nz-spin [nzSpinning]="loading" [nzTip]="'正在读取数据...'">
                <div nz-row [nzType]="'flex'" [nzJustify]="'center'" [nzAlign]="'middle'" class="app-icons">
                    <div nz-col [nzSpan]="6" (click)="openCreateContactLetterModal()" [acl]="1134">
                        <i class="anticon anticon-calendar bg-error text-white"></i>
                        <small>联系函表单</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-file bg-teal text-white"></i>
                        <small>操作日志</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-cloud bg-success text-white"></i>
                        <small>Cloud</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-star-o bg-pink text-white"></i>
                        <small>Star</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-team bg-purple text-white"></i>
                        <small>Team</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-scan bg-warning text-white"></i>
                        <small>QR</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-pay-circle-o bg-cyan text-white"></i>
                        <small>Pay</small>
                    </div>
                    <div nz-col [nzSpan]="6">
                        <i class="anticon anticon-printer bg-grey text-white"></i>
                        <small>Print</small>
                    </div>
                </div>
            </nz-spin>
        </div>
    </nz-dropdown>
    `
})
export class HeaderIconComponent {

    loading = true

    constructor(
        private modal: NzModalService
    ) { }

    openCreateContactLetterModal() {
        this.modal.create({
            nzTitle: `发送联系函表单`,
            nzContent: ContactLetterCreateModalComponent,
            nzWidth: 600,
            nzMaskClosable: false,
            nzFooter: null
        })
    }

    change() {
        setTimeout(() => this.loading = false, 500)
    }

}
