import { Component, OnInit, Input } from '@angular/core';
import { MonomerService } from '@core/monomer/monomer.service'
import { WarehousingService } from '@core/warehousing/warehousing.service'
import { Colors } from '../../../../constant/colors.enum'


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
    @Input() productType: number;
    @Input() warehouseType: number = 0;
    
    _monomerId: number
    @Input() 
    set monomerId(val) {
        this._monomerId = val;
        this.getData();
    }
    get monomerId() {
        return this._monomerId;
    }

    data: any[]

    isSpinning:boolean = false

    constructor(
        private monomerService: MonomerService,
        private warehousingService: WarehousingService
    ) { }

    async getData() {
        this.isSpinning = true
        try {
            const response = await this.warehousingService.getAll(this.monomerId, this.productType, this.warehouseType)
            this.data = response.map( o => {
                let color = Colors.WARN
                if(this.warehouseType == 0) {
                    if (o.totalQuantity === o.inStockQuantity) color = Colors.SUCCESS
                    if (o.inStockQuantity === 0) color = Colors.GRAY
                        return { 
                            content: `${o.name} ${o.serialNo} ${o.inStockQuantity}/${o.totalQuantity}`,
                            areas: [{
                                color,
                                percent: 1
                            }]
                        }
                }else {
                    if (o.totalQuantity === o.outStockQuantity) color = Colors.SUCCESS
                    if (o.outStockQuantity === 0) color = Colors.GRAY
                    return { 
                        content: `${o.name} ${o.serialNo} ${o.outStockQuantity}/${o.totalQuantity}`,
                        areas: [{
                            color,
                            percent: 1
                        }]
                    }
                }
                
            })
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
    }

    ngOnInit() {
        
    }

}
