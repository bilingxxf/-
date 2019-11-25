import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'

@Component({
  selector: 'app-bcpjy-histogram-chart',
  templateUrl: './bcpjy-histogram-chart.component.html',
})
export class BcpjyHistogramChartComponent implements OnInit {

    @ViewChild('echart') dom: ElementRef

    @Input() projectId: number

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
    }

}
