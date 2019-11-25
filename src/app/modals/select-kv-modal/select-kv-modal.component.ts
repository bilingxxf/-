import { Component, OnInit, Input } from '@angular/core'
import { NzModalRef } from '../../../../node_modules/ng-zorro-antd'

@Component({
  selector: 'app-select-kv-modal',
  templateUrl: './select-kv-modal.component.html',
})
export class SelectKvModalComponent implements OnInit {

    v: any

    @Input() kvs: {k: string, v: any}[]

    constructor(
        private subject: NzModalRef
    ) { }

    ngOnInit() {
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        // this.subject.next(this.v)
        this.subject.triggerOk();
    }

}
