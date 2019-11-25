import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { ProjectCustomerCreateDto } from '@core/project/project-customer-create-dto'
import { ProjectManagerCreateDto } from '@core/project/project-manager-create-dto'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-project-customer-c-u',
  templateUrl: './project-customer-c-u.component.html',
})
export class ProjectCustomerCUComponent implements OnInit {

    submitting = false

    @Input() btnText = ''

    @Input() dto = new ProjectCustomerCreateDto()

    @Output() onSubmitted = new EventEmitter<ProjectCustomerCreateDto>()

    constructor(
        private msg: NzMessageService
    ) { }

    ngOnInit() {
    }

    async ok() {
        // if (this.dto.managers.some(o => !o.name || !o.phone)) return this.msg.error('请填写项目主要负责人姓名及电话')
        this.onSubmitted.emit(this.dto)
    }

    addProjectManager() {
        this.dto.managers.push(new ProjectManagerCreateDto())
    }

}
