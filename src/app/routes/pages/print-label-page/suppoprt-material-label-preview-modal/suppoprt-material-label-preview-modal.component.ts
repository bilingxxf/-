import { Component, OnInit, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { SupportMaterial } from '../../../../core/support-material/support-material'
import { NzModalRef } from 'ng-zorro-antd'
import { UserService } from '../../../../core/user/user.service'
import { CompanyService } from '../../../../core/company/company.service'


@Component({
  selector: 'app-suppoprt-material-label-preview-modal',
  templateUrl: './suppoprt-material-label-preview-modal.component.html',
})
export class SuppoprtMaterialLabelPreviewModalComponent implements OnInit {

    @Input() labelContent: any

    constructor(
        private subject: NzModalRef,
        private userService: UserService,
        private companyService: CompanyService
    ) { }

    async ngOnInit() {
    }

    cancel() {
        this.subject.triggerCancel();
    }

}
