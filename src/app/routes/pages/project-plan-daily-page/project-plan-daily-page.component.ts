import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PagingData } from '@core/common-entity/paging-data'
import { PlanService } from '../../../core/plan/plan.service';
import { ProjectPlanDailyDTO } from '../../../core/plan/project-plan-daily.dto';
import * as moment from 'moment';
import { NzModalService } from '../../../../../node_modules/ng-zorro-antd';
import { ProjectPlanDailyModelComponent } from './project-plan-daily-model/project-plan-daily-model.component';
import { UtilService } from '@core/util/util.service'




@Component({
  selector: 'app-project-plan-daily-page',
  templateUrl: './project-plan-daily-page.component.html',
})
export class ProjectPlanDailyPageComponent implements OnInit {
    projectId: number

    data: any[] = []

    dto = new ProjectPlanDailyDTO() 

    productType: number = 1


    constructor(
        private route: ActivatedRoute,
        private planService: PlanService,
        private modal: NzModalService,
        private utilService: UtilService,


    ) { }

    async getData() {
       const response = await this.planService.getDailyPlanDetail(this.dto);
       this.data = response.map(val => {
           val.time = moment(val.submitTime).format('YYYY-MM-DD MM:hh:ss');
           return val
       })
    }

    export() {
        location.href = `/api/product-demand/plans/detail/actions/export?${this.utilService.objToSearch(this.dto)}`
    }

    async  getDetail(row) {
        const response = await this.planService.getDailyDetail(this.dto.monomerId, row.submitTime);
        this.modal.create({
            nzTitle: '成品需求计划',
            nzWidth: 800,
            nzContent: ProjectPlanDailyModelComponent,
            nzComponentParams: {
                data: response.productList
            },
            nzMaskClosable: false,
            nzOnOk: async () => {
                // this.getData()
            },
            nzFooter: null
        })
        console.log(response);
    }

    ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = +id)
        this.route.queryParams.subscribe((query) => {
            this.dto.monomerId = query.monomerId;
            this.dto.submitDate = query.date;
            this.productType= this.dto.productType = query.productType;
        })
        this.getData()
    }

}
