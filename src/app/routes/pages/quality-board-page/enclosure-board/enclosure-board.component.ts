import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../core/product/product.service'
import { ProductQualityQueryDto } from '../../../../core/product/product-quality-query-dto'
import { ProductQualityItem } from '@core/product/product-quality-item'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { Colors } from '../../../../constant/colors.enum'


@Component({
  selector: 'app-enclosure-board',
  templateUrl: './enclosure-board.component.html',
})
export class EnclosureBoardComponent implements OnInit {
    _monomerId: number
    @Input()
    set monomerId(val) {
        this.dto.monomerId = val;
        this._monomerId = val;
        this.getData()
    }
    get monomerId() {
        return this._monomerId
    }

    dto = new ProductQualityQueryDto()
    data :any[] = []

    constructor(
      private productService: ProductService
    ) { }

    ngOnInit() {
    }

    async getData() {
      this.dto.size = 1000;
      this.dto.type = 2;
      const response = await this.productService.getProductQuality(this.dto)
      this.data = response.data.map((val: any) => {
        let color = Colors.WARN;
        if (val.finishedPassedQuantity === val.totalQuantity) color = Colors.SUCCESS
        if (val.finishedPassedQuantity === 0) color = Colors.GRAY
        return {
          content: `${val.name} ${val.serialNo} ${val.finishedPassedQuantity}/${val.totalQuantity}`,
          areas: [{
            color,
            percent: 1
          }]
        }
      })
  }

}
