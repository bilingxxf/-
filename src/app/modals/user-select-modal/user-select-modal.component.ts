import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { NzModalRef } from 'ng-zorro-antd'

@Component({
  selector: 'app-user-select-modal',
  templateUrl: './user-select-modal.component.html',
})
export class UserSelectModalComponent implements OnInit {

    user

    users = [
        {
            id: 0,
            name: '小吴',
        },
        {
            id: 1,
            name: '小王',
        },
        {
            id: 2,
            name: '小刘',
        }
    ]

    constructor(
        private http: _HttpClient,
        private subject: NzModalRef
    ) { }

    ngOnInit() {
    }

    /** 取消弹窗 */
    cancel() {
        this.subject.triggerCancel();
    }

}
