import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ProjectListItem } from '../../core/project/project-list-item'
import { ProjectService } from '@core/project/project.service'
import { ContactLetterCDto } from '@core/contact-letter/contact-letter-c-dto'
import { NzModalRef, NzMessageService } from '../../../../node_modules/ng-zorro-antd'
import { ContactLetterService } from '../../core/contact-letter/contact-letter.service'

@Component({
  selector: 'app-contact-letter-create-modal',
  templateUrl: './contact-letter-create-modal.component.html',
})
export class ContactLetterCreateModalComponent implements OnInit {

    submitting = false

    dto = new ContactLetterCDto()

    projectList: ProjectListItem[] = []

    constructor(
        private projectService: ProjectService,
        private subject: NzModalRef,
        private contactLetterService: ContactLetterService,
        private msg: NzMessageService,
    ) { }

    async ngOnInit() {
        this.projectList = await this.projectService.getAll()
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.submitting = true
            await this.contactLetterService.c(this.dto)
            this.msg.success('发送成功')
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }
}
