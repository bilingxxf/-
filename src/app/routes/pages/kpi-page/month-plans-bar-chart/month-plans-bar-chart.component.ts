import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'


@Component({
  selector: 'app-month-plans-bar-chart',
  templateUrl: './month-plans-bar-chart.component.html',
})
export class MonthPlansBarChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    _year: number = 2018
    
    get year() {
        return this._year
    }
    set year(val) {
        this._year = val;
        this.getData()
    }
    @Input() projectId: number

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async getData() {
        const data = await this.http.get(`/product-setuo-plan-reports/actions/list?${this.utilService.objToSearch({
            year: this.year,
            projectId: this.projectId
        })}`).toPromise()

        const plans = [],
              finish = [],
              currentValue =[];
        for (let name in data) {
            currentValue.push(data[name]);
        }
        currentValue.forEach((val, index) => {
            plans.push(val.planAmount);
            finish.push(val.actualAmount);
        })
        setTimeout(() => {
            init(this.dom.nativeElement).setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['计划', '实际']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '(万元)',
                        nameLocation: 'end',
                    }
                ],
                series: [
                    {
                        name: '计划',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        barGap: 0,
                        data: plans
                    },
                    {
                        name: '实际',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        type: 'bar',
                        data: finish
                    }
                ]
            })
        }, 0)
    }

    async ngOnInit() {
        this.year = new Date().getFullYear()
    }

}
