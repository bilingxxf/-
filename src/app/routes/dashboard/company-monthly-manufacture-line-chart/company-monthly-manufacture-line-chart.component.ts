import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../../core/util/util.service'
import { init } from 'echarts'
import * as moment from 'moment';

@Component({
  selector: 'app-company-monthly-manufacture-line-chart',
  templateUrl: './company-monthly-manufacture-line-chart.component.html',
})
export class CompanyMonthlyManufactureLineChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() projectId: number
    @Input() companyId: number
    @Input() type: 'month' | 'year' = 'month';

    _yearMonth: string = '2018'
    
    get yearMonth() {
        return this._yearMonth
    }
    set yearMonth(val) {
        if (typeof val === 'object') {
            this._yearMonth = moment(val).format('YYYY-MM');
        } else {
            this._yearMonth = val;
        }
        this.getData()
    }

    async getData() {
        const x = this.getXaxis();
        const values = await this.http.get(`/project-reports/projectAmount?${
            this.utilService.objToSearch({
                // projectId: this.projectId,
                companyId: this.companyId,
                year: this.yearMonth,
                // dateType: this.type === 'month' ? 1 : 2
            })
        }`).toPromise();
        const currentValue = [];
        x.forEach(val => {
            let item = values.find(value => {
                return value.statisticalDate === val;
            })
            if (item) {
                currentValue.push(item.totalAmount)
            } else {
                currentValue.push(0)
            }
        })

        init(this.dom.nativeElement).setOption({
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x
            },
            yAxis: {
                type: 'value',
                nameLocation: 'end',
            },
            series: [{
                data: currentValue,
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter(val) {
                            return val.value;
                        },
                    }
                },
                areaStyle: {}
            }]
        })
    }

    getXaxis() {
        if (this.type === 'year') {
            return this.utilService.getMonths(this.yearMonth)
        } else if (this.type === 'month') {
            return this.utilService.getMonthDay(this.yearMonth)
        }
    }

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    ngOnInit() {
        if (this.type === 'month') {
            this.yearMonth = moment(new Date()).format('YYYY-MM');
        } else {
            this.yearMonth = new Date().getFullYear() + '';
        }
    }

}
