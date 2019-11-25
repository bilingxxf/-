import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-packing-label-preview-modal',
  templateUrl: './packing-label-preview-modal.component.html',
})
export class PackingLabelPreviewModalComponent implements OnInit {

    @Input() labelContent: any
    //Object

    constructor(
      private subject: NzModalRef
    ) { }

    ngOnInit() {
    }

    cancel() {
      this.subject.triggerCancel();
    }

}
