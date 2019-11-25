import { Component, OnInit, Input } from '@angular/core'
import { Weather } from '../../../../constant/weather.enum'
import { DayPart } from '../../../../constant/day-part.enum'
import { ConstructionLogCreateDto } from '@core/construction-log/construction-log-create-dto'
import { ConstructionLogService } from '../../../../core/construction-log/construction-log.service'
import { UserService } from '@core/user/user.service'
import { NzModalRef, NzMessageService } from 'ng-zorro-antd'
import { EditorConfig } from '../../../../constant/editor-config.constant'
import * as moment from 'moment';

@Component({
  selector: 'app-construction-log-create-modal',
  templateUrl: './construction-log-create-modal.component.html',
  styles: [`
    input {
        border-bottom: 1px solid #d9d9d9 !important;
    }
  `]
})
export class ConstructionLogCreateModalComponent implements OnInit {

    @Input() projectId: number

    _date: string

    @Input()  
    set date(val) {
        this._date = moment(val).format('YYYY-MM-DD');
    }

    get date() {
        return this._date
    }

    editorConfig = EditorConfig

    submitting = false

    weather = Weather

    dayPart = DayPart

    dto = new ConstructionLogCreateDto()

    user: any;
    constructor(
        private constructionLogService: ConstructionLogService,
        private userService: UserService,
        private subject: NzModalRef,
        private msg: NzMessageService
    ) { }

    async ngOnInit() {
        this.user = await this.userService.getUser();
        this.dto.userId = this.user.id;
        this.dto.projectId = this.projectId;
        this.dto.setDate(new Date(this.date));
    }

    cancel() {
        this.subject.triggerCancel();
    }

    async ok() {
        try {
            this.submitting = true
            await this.constructionLogService.c(this.dto)
            this.msg.success('保存成功')
            this.subject.triggerOk();
        } catch (e) {
            this.submitting = false
            this.msg.error(e.error.message)
        }
    }

}
