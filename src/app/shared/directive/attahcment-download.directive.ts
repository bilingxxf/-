import { Directive, Input, ElementRef, OnInit, HostListener } from '@angular/core'
import { UtilService } from '../../core/util/util.service'

@Directive({
    selector: '[attahcmentDownload]'
})
export class AttahcmentDownloadDirective implements OnInit {
    @Input('attahcmentDownload') attachmentId: number

    @Input() path: string

    @HostListener('click') onClick() {
        const url = this.path || `/api/attachments/actions/download?${this.utilService.objToSearch({ id: this.attachmentId })}`
        window.location.href = url
    }

    constructor(
        private utilService: UtilService,
        private el: ElementRef
    ) { }

    ngOnInit() {
    }

}
