import { Component, OnInit, Input } from '@angular/core'
import { ConstructionLogService } from '../../../../core/construction-log/construction-log.service'
import { ConstructionLogDetail } from '../../../../core/construction-log/construction-log-detail'
import { Weather } from '../../../../constant/weather.enum'
import * as moment from 'moment';

@Component({
  selector: 'app-construction-log-detail-modal',
  templateUrl: './construction-log-detail-modal.component.html',
})
export class ConstructionLogDetailModalComponent implements OnInit {

    weather = Weather

    @Input() id: number

    _date: string

    @Input() 
    set date(val) {
        this._date = moment(val).format('YYYY-MM-DD');
    }

    get date() {
        return this._date
    }

    detail = new ConstructionLogDetail()

    constructor(
        private constructionLogService: ConstructionLogService
    ) { }

    async ngOnInit() {
        this.detail = await this.constructionLogService.getDetail(this.id)
    }

}
