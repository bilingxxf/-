import { Component, OnInit, Input } from '@angular/core';
import { ProductTypes } from '../../../../constant/product-types.enum'
import { WarehousingFixStaticReqDto } from '../../../../core/warehousing-fix-static/warehousing-fix-static-req-dto';
import { WarehousingFixStaticService } from '../../../../core/warehousing-fix-static/warehousing-fix-static.service'
import { Colors } from '../../../../constant/colors.enum'
import { FinishTypes } from '../../../../constant/finish-types.enum';



@Component({
  selector: 'app-finished-panel-board',
  templateUrl: './finished-panel-board.component.html',
})
export class FinishedPanelBoardComponent implements OnInit {
    data: any[] = [];

    _monomerId: number

    @Input() productType = ProductTypes.结构;

    @Input()
    set monomerId(val: number) {
        this._monomerId = val;
        this.getData()
    }

    get monomerId() {
        return this._monomerId;
    }

    @Input() finishType: number = 1;

    dto = new WarehousingFixStaticReqDto()


    constructor(
        private warehousingFixStaticService: WarehousingFixStaticService,
    ) { }

    
    ngOnInit() {
    }
    
    async getData() {
      this.dto.type = this.productType;
      this.dto.size = 10000;
      this.dto.monomerId = this.monomerId;
      const response = await this.warehousingFixStaticService.getBoardData(this.dto);
      this.data = response.data.map( o => {
        let color = Colors.WARN
        if (this.finishType === 1) {
          if (o.totalQuantity === o.receiptQuantity) color = Colors.SUCCESS
          if (o.receiptQuantity === 0) color = Colors.GRAY
        } else if (this.finishType === 2) {
          if (o.totalQuantity === o.setupQuantity) color = Colors.SUCCESS
          if (o.setupQuantity === 0) color = Colors.GRAY
        }
        return { 
            content: `${o.name} ${o.serialNo} ${this.finishType === 1 ? o.receiptQuantity : o.setupQuantity}/${o.totalQuantity}`,
            areas: [{
                color,
                percent: 1
            }]
        }
      })
    }
}
