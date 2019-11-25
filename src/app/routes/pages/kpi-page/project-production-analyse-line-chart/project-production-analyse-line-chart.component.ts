import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../../../core/util/util.service'
import { init } from 'echarts'
import { ProductTypes } from '../../../../constant/product-types.enum';
import * as moment from 'moment';

@Component({ 
  selector: 'app-project-production-analyse-line-chart',
  templateUrl: './project-production-analyse-line-chart.component.html',
})
export class ProjectProductionAnalyseLineChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() projectId: number
    @Input() companyId: number
    // @Input() yearMonth: string = ''
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
        const values = await this.fetch();


        const structure_ = [];
        const containment_ = [];

        x.forEach(val => {
            let item_structure_ = values[0].find(value => {
                return value.warehouseDate === val;
            })
            if (item_structure_) {
                structure_.push(item_structure_.warehouseTotalNum)
            } else {
                structure_.push(0);
            }

            // let item_scontainment_ = values[1].find(value => {
            //     return value.warehouseDate === val;
            // })
            // if (item_scontainment_) {
            //     containment_.push(item_scontainment_.warehouseTotalNum)
            // } else {
            //     containment_.push(0);
            // }
        })
        

        init(this.dom.nativeElement).setOption({
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
                data: x
            },
            yAxis: {
                type: 'value',
                // name: '(吨/数量)',
                nameLocation: 'end',
            },
            series: [{
                // name: '结构',
                data: structure_,
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
            }
            // , {
            //     name: '围护',
            //     data: containment_,
            //     type: 'line',
            //     label: {
            //         normal: {
            //             show: true,
            //             position: 'top',
            //             formatter(val) {
            //                 return val.value;
            //             },
            //         }
            //     },
            //     areaStyle: {}
            // }
            ]
        })
    }


    constructor(
        private http: HttpClientService,
        private utilService: UtilService,
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
            this.http.get(`/manufacture-report/daily-reports?${this.utilService.objToSearch({
                projectId: this.projectId,
                companyId: this.companyId,
                yearMonth: this.yearMonth,
                productType: ProductTypes['结构'],
                dateType: this.type === 'month' ? 1 : 2
            })}`).toPromise(),
            // this.http.get(`/manufacture-report/daily-reports?${this.utilService.objToSearch({
            //     projectId: this.projectId,
            //     companyId: this.companyId,
            //     yearMonth: this.yearMonth,
            //     productType: ProductTypes['围护'],
            //     dateType: this.type === 'month' ? 1 : 2
            // })}`).toPromise()
        ]
        return await Promise.all(promises).then(resp => {
            return resp
        })
    }

    async ngOnInit() {
        if (this.type === 'month') {
            this.yearMonth = moment(new Date()).format('YYYY-MM');
        } else {
            this.yearMonth = new Date().getFullYear() + '';
        }
    }

}
