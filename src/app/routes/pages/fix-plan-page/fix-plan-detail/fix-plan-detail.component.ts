import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { PagingData } from '@core/common-entity/paging-data'
import { SetupPlanQueryDTO, SetupHistoryDTO } from '../../../../core/plan/setup-plan.dto';
import { FixPlanTypes } from '../../../../constant/fix-plan-types.enum'
import * as moment from 'moment';
import { PlanService } from '@core/plan/plan.service';
import { FixPlanDetailModalComponent } from '../fix-plan-detail-modal/fix-plan-detail-modal.component';
import { NzModalService } from 'ng-zorro-antd'
import { UtilService } from '@core/util/util.service'


let vm

@Component({
  selector: 'app-fix-plan-detail',
  templateUrl: './fix-plan-detail.component.html',
})
export class FixPlanDetailComponent implements OnInit {
    @Input() projectId: number;
    @Input() monomerId: number;
    @Input() pm: any
    @Input() fixPlanTypes: number = FixPlanTypes.月计划
    @Input() date: Date = new Date()

    data: any[] = [];
    dto = new SetupPlanQueryDTO()
    years = this.utilService.getRecentYears();
    year: number = new Date().getFullYear();
    query = new SetupHistoryDTO();
    _type: number = 2
    set type(val) {
        this._type = val;
        this.query.type = val;
        this.query.year = new Date().getFullYear();
        this.data = [];
    }
    get type() {
        return this._type;
    }

    constructor(
        private planService: PlanService,
        private modal: NzModalService,
        private utilService: UtilService

    ) { }

    disabledDate(current: Date): boolean {
        const date = moment(current)
        return date.weekday() !== 6
    }

    async search() {
        // try {
        //     if (this.dto.type === FixPlanTypes.月计划 ) {
        //         const date = new Date(this.dto.demandStartDate),
        //               month = date.getMonth();
        //         date.setDate(1);
        //         this.dto.demandStartDate = date.getTime();
        //     } else if (this.dto.demandStartDate) {
        //         this.dto.demandStartDate = new Date(this.dto.demandStartDate).getTime()
        //     } 
        //     this.data = await this.planService.getSetupPlan(this.dto);
        //     this.data.data = this.data.data.map(val => {
        //         val.time = moment(val.submitTime).format('YYYY-MM-DD');
        //         return val
        //     })

        // } catch (e) {
        //     console.log(e);
        // }
        
        try {
            const query = Object.assign({}, this.query);
            if (query.type === FixPlanTypes.周计划 ) {
                query.year = new Date(this.query.month).getFullYear();
                query.month = new Date(this.query.month).getMonth();
            } else {
                query.month = ''
            }
            let response = await this.planService.getHistoryPlans(query);
            this.data = response.map(val => {
                val.time = moment(val.submitTime).format('YYYY-MM-DD');
                return val
            })
        } catch (e) {

        }
    }

    async getDetail(item) {
        
        this.query.orderNum = item.orderNum;
        const query = Object.assign({}, this.query);
        if (query.type === FixPlanTypes.周计划 ) {
            query.year = new Date(this.query.month).getFullYear();
            query.month = new Date(this.query.month).getMonth();
        } else {
            query.month = query.orderNum
        }
        const response = await this.planService.getHistoryDetail(query);

        this.modal.create({
            nzTitle: '安装计划',
            nzContent: FixPlanDetailModalComponent,
            nzComponentParams: {
                data: response
            },
            nzWidth: 800,
            nzMaskClosable: false,
            nzFooter: null
        })
    }

    export(item) {
        // const dto = new SetupPlanQueryDTO()
        // dto.monomerId = this.monomerId;
        // dto.demandStartDate = item.demandStartDate;
        // dto.submitTime = item.submitTime;
        // dto.userId = item.userId;
        // dto.type = this.dto.type;
        const query: any = {
            monomerId: this.monomerId,
            type: this.query.type,
            year: this.query.year,
            month: this.query.month,
            orderNum: item.orderNum
        }
        location.href = `/api/products/setup-plans/history/actions/export?${this.utilService.objToSearch(query)}`
    }

    async ngOnInit() {
        vm = this
        this.dto.type = this.fixPlanTypes
        this.dto.monomerId = this.monomerId;
        this.dto.demandStartDate = new Date();
        this.query.type = this.fixPlanTypes;
        this.query.monomerId = this.monomerId;
        this.query.year = new Date().getFullYear();
        this.query.month = new Date();
        this.search()
    }

}
