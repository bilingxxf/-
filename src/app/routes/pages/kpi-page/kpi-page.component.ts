import { Component, OnInit, OnDestroy } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ActivatedRoute } from '@angular/router'
import { InvoiceTypes } from '../../../constant/invoice-types.enum'
import { WarehouseType } from '../../../constant/warehouse-type.enum'
import { ProductTypes } from '../../../constant/product-types.enum';
import { UserService } from '@core/user/user.service'

@Component({
  selector: 'app-kpi-page',
  templateUrl: './kpi-page.component.html',
})
export class KpiPageComponent implements OnInit, OnDestroy {

    projectId: number

    invoiceTypes = InvoiceTypes

    warehouseType = WarehouseType

    productTypes = ProductTypes


    companyId: number

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) { }

    async ngOnInit() {
        this.companyId = (await this.userService.getUser()).companyId
        this.route.params.subscribe(({id}) => this.projectId = id)
    }

    ngOnDestroy() {
        // console.log(1);
        this.projectId = null;
    }

}
