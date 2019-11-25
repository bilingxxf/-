import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { init } from 'echarts'
import { UtilService } from '@core/util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'


@Component({
  selector: 'app-receipt-bar-chart',
  templateUrl: './receipt-bar-chart.component.html',
})
export class ReceiptBarChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef

    @Input() type: number

    @Input() porjectId: number

    @Input() year = 2018

    constructor(
        private http: _HttpClient,
        private utilService: UtilService

    ) { }

    async ngOnInit() {
        const data: any= await this.http
            .get(`/invoice-reports/project-reports?${this.utilService.objToSearch({
            type: this.type,
            porjectId: this.porjectId
        })}`)
        .toPromise()
    }

}
