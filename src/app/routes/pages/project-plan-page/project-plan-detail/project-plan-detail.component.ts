import { Component, OnInit, Input } from '@angular/core'
import { PlanService } from '../../../../core/plan/plan.service'
import { PlanQueryByMonthQueryDto } from '@core/plan/plan-query-by-month-query-dto';
import * as moment from 'moment'
import { Router } from '@angular/router'


@Component({
  selector: 'app-project-plan-detail',
  templateUrl: './project-plan-detail.component.html',
})
export class ProjectPlanDetailComponent implements OnInit {

    // month: Date = new Date()
    @Input() monomerId: number

    @Input() projectId: number

    @Input() productType: number = 1

    _active = 1;

    set active(val) {
        this._active = val;
        this.productType = val;
        this.getData()
    }

    get active() {
        return this._active;
    }

    data: any[] = []

    _date: any

    set date(val) {
        this._date = val;
        this.getData()
    }
    get date() {
        return this._date;
    }

    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]
    
    leftSelectedIndex: number = 0

    leftTabs: any = [{
            name: '结构',
            value: 'structure',
            index: 0
        }
    ]

    dto = new PlanQueryByMonthQueryDto()

    constructor(
        private planService: PlanService,
        private router: Router

    ) { }

    async getData() {
        const date = moment(this.date).format('YYYY-MM')
        this.dto.productType = this.productType;
        this.dto.projectId = this.projectId;
        this.dto.yearMonth = moment(this.date).format('YYYY-MM')
        this.dto.monomerId = this.monomerId
        this.data = await this.planService.getPlanBycalendar(this.dto)
    }

    async ngOnInit() { 
        this.date = new Date();
    }

    go(date) {
        console.log(date)
        this.router.navigate(['/project-plan-daily', this.projectId], {
            queryParams: {
                date: date,
                monomerId: this.monomerId,
                productType: this.productType
            }
        })
    }

}
