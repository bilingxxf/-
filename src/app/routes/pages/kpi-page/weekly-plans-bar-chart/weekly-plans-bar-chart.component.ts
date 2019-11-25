import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'

@Component({
  selector: 'app-weekly-plans-bar-chart',
  templateUrl: './weekly-plans-bar-chart.component.html',
})
export class WeeklyPlansBarChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef

    @Input() month = 9
    @Input() projectId: number
    @Input() year = 2018

    _yearMonth: Date
    get yearMonth() {
        return this._yearMonth
    }
    set yearMonth(val) {
        this._yearMonth = val;
        this.getData()
    }

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async getData() {
        const data = await this.http.get(`/product-setuo-plan-reports/actions/list?${this.utilService.objToSearch({
            month: this.yearMonth.getMonth() + 1,
            year: this.yearMonth.getFullYear(),
            projectId: this.projectId
        })}`).toPromise()
        let x_axis = [],
            plans = [],
            finish = [],
            currentValue = [];
        for (let name in data) {
            currentValue.push(data[name]);
        }
        x_axis = currentValue.map((val, index) => {
            plans.push(val.planAmount);
            finish.push(val.actualAmount);
            return `第${index + 1}周`
        })
        setTimeout(() => {
            init(this.dom.nativeElement).setOption({
                // color: ['#003366', '#006699'],
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
                        data: x_axis
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
                        barGap: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: plans
                    },
                    {
                        name: '实际',
                        type: 'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: finish
                    }
                ]
            })
        }, 0)
    }

    async ngOnInit() {
        this.yearMonth = new Date()
    }

}
