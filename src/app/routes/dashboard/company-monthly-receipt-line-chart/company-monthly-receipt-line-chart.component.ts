import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { init } from 'echarts'
import { UtilService } from '../../../core/util/util.service'
import { InvoiceTypes } from '../../../constant/invoice-types.enum';

@Component({
  selector: 'app-company-monthly-receipt-line-chart',
  templateUrl: './company-monthly-receipt-line-chart.component.html',
})
export class CompanyMonthlyReceiptLineChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() companyId: number
    // @Input() year: number = 2018

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
        const data = await this.http.get(`/invoice-reports/monthly-reports?${this.utilService.objToSearch({
            companyId: this.companyId,
            type: InvoiceTypes.收款, 
            year: this.year
        })}`).toPromise();

        const x_asis = this.utilService.getMonths(this.year),
        values = [];
        x_asis.forEach(val => {
            let item = data.find(value => {
                return value.yearMonth === val
            })
            if (item) {
                values.push((item.totalAmount/10000).toFixed(2))
            } else {
                values.push(0)
            }
        })

        init(this.dom.nativeElement).setOption({
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x_asis
            },
            yAxis: {
                type: 'value',
                // name: '(万元)',
                nameLocation: 'end',
            },
            series: [{
                data: values,
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter(val) {
                            return val.value;
                        },
                    },
                },
                areaStyle: {}
            }]
        })

    }

    async ngOnInit() {
        this.year = new Date().getFullYear();
    }

}
