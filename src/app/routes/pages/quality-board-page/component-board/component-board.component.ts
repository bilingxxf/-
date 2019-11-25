import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../../core/product/product.service'
import { ProductQualityQueryDto } from '../../../../core/product/product-quality-query-dto'
import { ProductQualityItem } from '@core/product/product-quality-item'
import { Box } from '../../../../shared/component/multi-color-box-list/box'
import { Colors } from '../../../../constant/colors.enum'

@Component({
  selector: 'app-component-board',
  templateUrl: './component-board.component.html',
})
export class ComponentBoardComponent implements OnInit {

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

  // 工序状态  1 是整装 2是涂装
  @Input() processType: number = 1

  dto = new ProductQualityQueryDto()
  data :any[] = []
  isSpinning:boolean = false
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  async getData() {
    // this.dto.serialNo = searchStr
    this.isSpinning = true
    try {
      this.dto.size = 1000;
      this.dto.type = 1;
      const response = await this.productService.getProductQuality(this.dto)
      this.data = response.data.map((val: any) => {
        let quality = 0;
        if (this.processType === 1) {
          quality = val.inspectionStats.semiFinishedPassedQuantity;
        } else {
          quality = val.inspectionStats.finishedPassedQuantity;
        }
        let color = Colors.WARN;
        if (quality === val.totalQuantity) color = Colors.SUCCESS
        if (quality === 0) color = Colors.GRAY
        return {
          content: `${val.name} ${val.serialNo} ${quality}/${val.totalQuantity}`,
          areas: [{
            color,
            percent: 1
          }]
        }
      })   
    } catch (e) {
        console.log(e)
    } finally {
        this.isSpinning = false
    }
}

}
