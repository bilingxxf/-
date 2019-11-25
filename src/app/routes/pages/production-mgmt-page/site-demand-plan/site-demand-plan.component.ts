import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { SitDemandPlanDTO } from '@core/product-demand/site-demand-plan-dto'

@Component({
  selector: 'app-site-demand-plan',
  templateUrl: './site-demand-plan.component.html',
})
export class SiteDemandPlanComponent implements OnInit {

    @Input() projectId: number

    @Input() monomerId: number

    date:any = new Date()

    demandData:any = []

    queryDTO = new SitDemandPlanDTO()

    constructor(
    ) { }

    ngOnInit() {
    }

    /**
     * 显示详情
     *
     * @param {*} item
     * @memberof SiteDemandPlanComponent
     * @author duhh
     */
    showDetail(item) {

    }

    /**
     * 导出
     *
     * @param {*} item
     * @memberof SiteDemandPlanComponent
     * @author duhh
     */
    exportDetail(item) {

    }

    /**
     * 获取工地需求
     * 
     * @memberof SiteDemandPlanComponent
     * @author duhh
     */
    getSiteDemand() {

    }

    /**
     * 时间改变
     *
     * @param {Date} result
     * @memberof SiteDemandPlanComponent
     */
    onDateChange(result: Date):void {
      let valDate = moment(result).format('YYYY-MM')
      this.getSiteDemand()
  }

}
