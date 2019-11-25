import { Component, OnInit, Input } from '@angular/core'
import { ProductivityService } from '../../../../../core/productivity/productivity.service'
import { Box } from '@shared/component/multi-color-box-list/box'
import { ProductTypes } from '../../../../../constant/product-types.enum'

@Component({
  selector: 'app-productivity-static-tile-mode',
  templateUrl: './productivity-static-tile-mode.component.html',
})
export class ProductivityStaticTileModeComponent implements OnInit {
    @Input() productType: number

    @Input() finishType: number

    _monomerId: number
    @Input()
    set monomerId(val) {
        this._monomerId = val;
        this.serialNo = ''
        this.getData() 
    }
    get monomerId() {
        return this._monomerId
    }

    serialNo = ''

    structureBoxs: Box[] = []

    enclosureBoxs: Box[] = []

    data: Box[] = []

    isSpinning:boolean = false

    constructor(
        private productivityService: ProductivityService
    ) { }

    async getData() {
        this.isSpinning = true
        try {
            this.data = await this.productivityService.getBoxs(this.monomerId, this.productType, this.finishType, this.serialNo);
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }

    }
  
    async ngOnInit() {
        // const [structureBoxs, enclosureBoxs] = await Promise.all([this.productivityService.getBoxs(this.monomerId, ProductTypes.结构), this.productivityService.getBoxs(this.monomerId, ProductTypes.围护)])
        // this.structureBoxs = structureBoxs
        // this.enclosureBoxs = enclosureBoxs
    }

}
