import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ScanTypes } from '../../../constant/scan-types.enum';
import { WarehousingFixStaticService } from '../../../core/warehousing-fix-static/warehousing-fix-static.service'



@Component({
  selector: 'app-finished-daily-detail',
  templateUrl: './finished-daily-detail.component.html',
})
export class FinishedDailyDetailComponent implements OnInit {
    projectId: number;
    productType: number;
    date: string;
    monomerId: number;
    scanTypes: string

    active = 1;

    constructor(
        private route: ActivatedRoute,
        private warehousingFixStaticService: WarehousingFixStaticService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(({ projectId }) => this.projectId = projectId)
        this.route.queryParams.subscribe((query) => {
            console.log(query);
            this.scanTypes = query.scanType;
            this.productType = Number(query.productType);
            this.date = query.date;
            this.monomerId = query.monomerId;
        })
    }

}
