import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { WarehousingService } from '../../../core/warehousing/warehousing.service'
import { CargoListService } from '../../../core/cargo-list/cargo-list.service';
import { WarehouseType } from '../../../constant/warehouse-type.enum';



@Component({
  selector: 'app-warehousing-daily-detail',
  templateUrl: './warehousing-daily-detail.component.html',
})
export class WarehousingDailyDetailComponent implements OnInit {
    projectId: number;
    warehouseType: number;
    productType: number;
    date: string;
    monomerId: number;
    WarehouseType = WarehouseType;
    active = 1;

    constructor(
        private route: ActivatedRoute,
        private warehousingService: WarehousingService,
        private cargoListService: CargoListService
    ) { }

    getData() {

    }

    ngOnInit() {
        this.route.params.subscribe(({ projectId }) => this.projectId = projectId)
        this.route.queryParams.subscribe((query) => {
            this.warehouseType = Number(query.warehouseType);
            this.productType = Number(query.productType);
            this.date = query.date;
            this.monomerId = query.monomerId;
        })
    }

}
