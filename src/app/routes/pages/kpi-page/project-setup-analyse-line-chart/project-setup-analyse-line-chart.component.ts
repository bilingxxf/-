import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'
import * as moment from 'moment'

@Component({
  selector: 'app-project-setup-analyse-line-chart',
  templateUrl: './project-setup-analyse-line-chart.component.html',
})
export class ProjectSetupAnalyseLineChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() projectId: number
    @Input() companyId: number


    @Input() type: string = 'year';

    _yearMonth = '2018'
    get yearMonth() {
        return this._yearMonth
    }
    set yearMonth(val: any) {
        if (typeof val === 'string') {
            this._yearMonth = val;
        } else {
            this._yearMonth = moment(val).format('YYYY-MM');
        }
        this.getData();
    }

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    getXaxis() {
        if (this.type === 'year') {
            return this.utilService.getMonths(this.yearMonth)
        } else if (this.type === 'month') {
            return this.utilService.getMonthDay(this.yearMonth)
        }
    }

    async fetch() {
        const promises = [
            this.http.get(`/project-reports/projectCount?${this.utilService.objToSearch({
                // projectId: this.projectId,
                year: this.yearMonth,
                companyId: this.companyId,
                // dateType: this.type === 'month' ? 1 : 2
            })}`).toPromise()
        ]
        return await Promise.all(promises).then(resp => {
            return resp
        })
    }

    async getData() {
        const values = await this.fetch();
        const values_structure_ = [];
        const values_containment_ = [];
        const x_ = this.getXaxis();
        const structure_ = values[0];
        const containment_ = values[1];

        x_.forEach(val => {
            let item_structure_ = structure_.find(value => {
                return value.statisticalDate === val
            })

            if (item_structure_) {
                values_structure_.push(item_structure_.projectCount)
            } else {
                values_structure_.push(0);
            }

            // let item_scontainment_ = containment_.find(value => {
            //     return value.setupDate === val
            // })

            // if (item_scontainment_) {
            //     values_containment_.push(item_scontainment_.surfaceArea)
            // } else {
            //     values_containment_.push(0);
            // }
        })
        const options = {
            color: ['#3398DB'],
            // legend: {
            //     top: 20,
            //     data: [{
            //         name: '结构',
            //         icon: 'rect'
            //     }, {
            //         name: '围护',
            //         icon: 'rect'
            //     }],
            // },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: x_
            },
            yAxis: {
                // name: '(吨/数量)',
                nameLocation: 'end',
                type: 'value',
                minInterval : 1,
                splitNumber : 5,
                boundaryGap : [ 0, 0.1 ]
            },
            series: [{
                // name: '结构',
                data: values_structure_,
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
            }, 
            // {
            //     name: '围护',
            //     data: values_containment_,
            //     type: 'line',
            //     label: {
            //         normal: {
            //             show: true,
            //             position: 'top',
            //             formatter(val) {
            //                 return val.value ;
            //             },
            //         }
            //     },
            //     areaStyle: {}
            // }
            ]
        }
        init(this.dom.nativeElement).setOption(options);
        
       
    }

    async ngOnInit() {
        if (this.type === 'month') {
            this.yearMonth = moment(new Date()).format('YYYY-MM');
        } else {
            this.yearMonth = new Date().getFullYear() + '';
        }
    }

}
