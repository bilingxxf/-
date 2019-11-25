import { Component, OnInit, Input } from '@angular/core';
import { ProductTypes } from '../../../../../constant/product-types.enum'
import { WarehousingService } from '@core/warehousing/warehousing.service'
import { WarehousingQueryDto } from '@core/warehousing/warehousing-query-dto'
import { WarehousingItem } from '@core/warehousing/warehousing-item'
import { WarehousingSumItem } from '@core/warehousing/warehousing-sum'
import { PagingData } from '@core/common-entity/paging-data'

@Component({
  selector: 'app-warehousing-mat-board',
  templateUrl: './warehousing-mat-board.component.html',
})
export class WarehousingMatBoardComponent implements OnInit {

  @Input() productType = ProductTypes.结构;

  @Input() monomerIds

  _monomerId: number
  @Input()
  set monomerId(val: number) {
      this._monomerId = val;
      this.getData()
  }

  get monomerId() {
      return this._monomerId;
  }


  dto = new WarehousingQueryDto()

  data = new PagingData<WarehousingItem>()

  sum = new PagingData<WarehousingSumItem>()

  isSpinning:boolean = false

  constructor(
      private warehousingService: WarehousingService
  ) { }

  async ngOnInit() {
     
  }

  search() {
      this.dto.page = 1;
      this.getData()
  }

  async getData() {
    this.isSpinning = true
    try {
        this.dto.monomerId = this.monomerId;
        this.dto.productType = this.productType;
        this.data = await this.warehousingService.list(this.dto);   
    } catch (e) {
        console.log(e)
    } finally {
        this.isSpinning = false
    }
  }

}
