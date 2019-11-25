import { Component, OnInit, Input } from '@angular/core'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { TotalPregressQueryDto } from '@core/total-progress/total-pregress-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { TotalPregressListItem } from '@core/total-progress/total-pregress-list-item'
import { TotalPregressService } from '@core/total-progress/total-pregress.service'

@Component({
  selector: 'app-total-progress-table',
  templateUrl: './total-progress-table.component.html',
})
export class TotalProgressTableComponent implements OnInit {

    @Input() productType: number
    
    _monomerId: number
    @Input()
    set monomerId(val) {
        this._monomerId = val; 
        if (this.productType === 2 || this.productType === 3) {
            this.getData();
        }
        // this.getSum();
    }

    get monomerId() {
        return this._monomerId
    }

    _areaDivisionId: number

    @Input() 
    set areaDivisionId(val) {
        this._areaDivisionId = val;
        if (this.productType === 1) {
            this.dto.page = 1
            this.getData();
            // this.getSum();
        }
    }

    get areaDivisionId() {
        return this._areaDivisionId;
    }

    types = ProductTypes

    dto = new TotalPregressQueryDto()

    data = new PagingData<TotalPregressListItem>()

    sum: any = {}

    isSpinning:boolean = false

    constructor(
        private totalPregressService: TotalPregressService
    ) { }

    ngOnInit() {
        
    }

    async getSum() {
        this.sum = await this.totalPregressService.getSum(this.monomerId, this.productType, this.areaDivisionId)
    }

    search() {
        this.dto.page = 1
        this.getData()
    }

    async getData() {
        this.isSpinning = true
        try {
            this.dto.productType = this.productType
            if (this.productType === 1) {
                this.dto.monomerId = this.areaDivisionId;
            } else {
                this.dto.monomerId = this.monomerId
            }
            this.data = await this.totalPregressService.list(this.dto)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

}
