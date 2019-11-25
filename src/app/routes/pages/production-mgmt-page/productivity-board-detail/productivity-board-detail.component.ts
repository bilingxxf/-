import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router'
import { ProductivityService } from '@core/productivity/productivity.service';
import { ProductivityQueryDto } from '@core/productivity/productivity-query-dto';
import { ProductivityListItem } from '@core/productivity/productivity-list-item'
import { UtilService } from '@core/util/util.service'




@Component({
  selector: 'app-productivity-board-detail',
  templateUrl: './productivity-board-detail.component.html',
  styles:[
    `.project-content{
      display:flex;
      justify-content: space-between;
      margin-bottom:10px;
    }`
  ]
})
export class ProductivityBoardDetailComponent implements OnInit {
    projectId: number
    monomerId: number;
    queryDate: string;
    productType: number;

    data: ProductivityListItem[] = [];
    constructor(
      private route: ActivatedRoute,
      private productivityService: ProductivityService,
      private utilService: UtilService
    ) { }

    async ngOnInit() {
      this.route.params.subscribe(({ id }) => this.projectId = id)
      this.route.queryParams.subscribe((query) => {
        this.productType = query.productType;
        this.monomerId = query.monomerId;
        // this.queryDate = query.date;
        const dto = new ProductivityQueryDto(this.productType);
        // dto.createDate = this.queryDate;
        dto.monomerId = this.monomerId;
        dto.size = 1000;
        this.getData(dto)
      })
    }

    async getData(query) {
      const response = await this.productivityService.getBoardDetail(query)
      this.data = response.data;
    }
    export() {
      location.href = `/api/manufactures/records/output-info/actions/export?${this.utilService.objToSearch({
        monomerId: this.monomerId,
        productType: this.productType,
        // createDate: this.queryDate
      })}`
    }
}
