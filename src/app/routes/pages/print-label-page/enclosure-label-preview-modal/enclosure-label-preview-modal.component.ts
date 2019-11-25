import { Component, OnInit, Input } from '@angular/core'
import { Enclosure } from '@core/enclosure/enclosure'
import { NzModalRef } from 'ng-zorro-antd'
import { UserService } from '../../../../core/user/user.service'
import { CompanyService } from '../../../../core/company/company.service'

@Component({
  selector: 'app-enclosure-label-preview-modal',
  templateUrl: './enclosure-label-preview-modal.component.html',
})
export class EnclosureLabelPreviewModalComponent implements OnInit {
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
