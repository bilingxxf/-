import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment'
import { Monomer } from '@core/monomer/monomer'
import { ProductTypes } from '../../../../constant/product-types.enum'
import { ScanTypes } from '../../../../constant/scan-types.enum';




@Component({
  selector: 'app-finished-mgmt-page',
  templateUrl: './finished-mgmt-page.component.html',
  styles: [
    `.item {
      margin: 0 4px;
      padding: 4px 8px;
      height: 116px;
      border-top: 2px solid #e9e9e9;
    }

    .item-disabled {
      color: rgba(0, 0, 0, .25);
    }

    .item-wrote {
      border-top-color: #00CC83;
      cursor: pointer;
    }

    .item-unwrote {
      cursor: pointer;

      :hover {
        background-color: #EEF7FD;
      }
    }`
    ]
})
export class FinishedMgmtPageComponent implements OnInit {
    
    @Input() projectId: number

    @Input() pageMonomers: any[]

    @Input() currentMonomer: any;

    @Input() scanType: string = ScanTypes.收货;

    active = 1;

    productTypes = ProductTypes;
    date = new Date()


    weeks = [
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '日'
    ]

    monomers: Monomer[] = [];

    constructor(

    ) { }



    async ngOnInit() {
        // console.log(this.currentMonomer);
    }

}
