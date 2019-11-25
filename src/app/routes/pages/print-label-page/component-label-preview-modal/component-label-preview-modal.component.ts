import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-component-label-preview-modal',
  templateUrl: './component-label-preview-modal.component.html',
})
export class ComponentLabelPreviewModalComponent implements OnInit {

    @Input() labelContent: any

    constructor(
        private subject: NzModalRef
    ) { }

    async ngOnInit() {
    }

    cancel() {
        this.subject.triggerCancel();
    }

}
