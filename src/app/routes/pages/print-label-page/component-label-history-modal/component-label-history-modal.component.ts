import { Component, OnInit, Input } from '@angular/core';
import { PagingData } from '@core/common-entity/paging-data'
import { ProductService } from '../../../../core/product/product.service'
import { PrientHistoryQueryDTO } from '../../../../core/product/product-print-history.dto';
import * as moment from 'moment';


@Component({
  selector: 'app-component-label-history-modal',
  templateUrl: './component-label-history-modal.component.html',
})
export class ComponentLabelHistoryModalComponent implements OnInit {
    @Input() productId: number;
    @Input() manufacturePlanId: number;

    dto = new PrientHistoryQueryDTO();
    data = new PagingData<any>();

    isSpinning:boolean = false

    constructor(
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.dto.productId = this.productId;
        this.dto.manufacturePlanId = this.manufacturePlanId;
        this.getData();
    }

    async getData() {
        this.isSpinning = true
        try {
            if(this.dto.manufacturePlanId){
                this.data = await this.productService.getPrintHisByTaskId(this.dto);
            }else{
                this.data = await this.productService.getPrintHis(this.dto);
            }
            
            this.data.data = this.data.data.map(val => {
                val.createTime = moment(val.createTime).format('YYYY-MM-DD HH:mm:ss')
                return val
            })
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

}
