import { Component, OnInit, Input } from '@angular/core';
import { BaseQueryDTO } from '@core/base/base-query-dto'
import { WarehousingFixStaticService } from '@core/warehousing-fix-static/warehousing-fix-static.service'

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {

    @Input() date:string

    @Input() monomerId: number

    listQuery = new BaseQueryDTO()

    data: any = []

    isSpinning: boolean = false

    constructor(
        private warehousingFixStaticService: WarehousingFixStaticService,

    ) {}

    ngOnInit() {
      this.getDetail()
    }

    async getDetail() {
      this.listQuery.loading = true
      this.listQuery.queryDate = this.date
      this.listQuery.monomerId = this.monomerId
      this.data = await this.warehousingFixStaticService.fetchListByDayForStruc(this.listQuery)
      this.listQuery.loading = false
    }

}
