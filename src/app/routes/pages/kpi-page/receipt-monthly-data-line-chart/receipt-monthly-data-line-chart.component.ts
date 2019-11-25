import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'

@Component({
  selector: 'app-receipt-monthly-data-line-chart',
  templateUrl: './receipt-monthly-data-line-chart.component.html',
})
export class ReceiptMonthlyDataLineChartComponent implements OnInit {

    @ViewChild('echart') dom: ElementRef

    @Input() companyId: number
    @Input() projectId: number

    _year: number = 2018
    
    get year() {
        return this._year
    }
    set year(val) {
        this._year = val;
        this.getData()
    }

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }


    async getData() {
        const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(val => {
            return `${this.year}-${val}`
        });
        const x = []
        const values = []
        const data: DataItem[] = await this.http
            .get(`/invoice-reports/monthly-reports?${this.utilService.objToSearch({
                companyId: this.companyId,
                projectId: this.projectId,
                year: this.year,
                type: 1
            })}`)
            .toPromise()
        month.forEach(val => {
            let item = data.find(value => {
                return value.yearMonth === val
            })
            if (item) {
                values.push(item.totalAmount)
            } else {
                values.push(0);
            }
        })
        init(this.dom.nativeElement).setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: month
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: values,
                type: 'line',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {}
            }]
        })
    }
    async ngOnInit() {
        this.year = new Date().getFullYear()
    }

}

export class DataItem {
    totalAmount: number

    /** YYYY-MM */
    yearMonth: string
}
