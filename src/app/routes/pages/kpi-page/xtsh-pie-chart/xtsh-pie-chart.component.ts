import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../../../core/util/util.service'
import { init } from 'echarts'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'

@Component({
  selector: 'app-xtsh-pie-chart',
  templateUrl: './xtsh-pie-chart.component.html',
})
export class XtshPieChartComponent implements OnInit, OnDestroy {

    @ViewChild('echart') dom: ElementRef

    @Input() projectId: number
    @Input() companyId: number
    tableData: any = []
    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }
    ngOnDestroy() {
        this.projectId = null;
    }

    async ngOnInit() {
        let values = []
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        const data: DataType = await this.http.get(`/list-import-reports?${this.utilService.objToSearch({
            projectId: this.projectId,
            companyId: this.companyId
        })}`)
        .toPromise()
        this.tableData.push(data)
        this.tableData = this.tableData.filter(item => {
            return item.percent = ((item.importTotalWeight/item.biddingTotalWeight)*100).toFixed(2)
        });
        values =(data.importTotalWeight == 0 || data.biddingTotalWeight==0)?[0]: [((data.importTotalWeight / data.biddingTotalWeight)*100).toFixed(2)]
        // console.log('深化设计', values)
        init(this.dom.nativeElement).setOption({
            title: {
                text: "",
                textStyle: {
                    color: '#fff',
                    fontSize: '22'
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: '16',
                },
            },
            yAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#363e83',
                    }
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                },
                data: [''],
            }, {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: [''],
            }],
            xAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false
                },
            },
            series: [{
                name: '',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter(val) {
                            return val.value + '%';
                        },
                        textStyle: {
                            fontSize: 14,
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#00B050',
                        borderWidth: 0,
                    },
                },
                zlevel: 2,
                barWidth: '40',
                data: values,
            },
            {
                name: '',
                type: 'bar',
                yAxisIndex: 1,
                zlevel: 1,
                itemStyle: {
                    normal: {
                        color: '#BFBFBF',
                        borderWidth: 0,
                        shadowBlur: {
                            shadowColor: 'rgba(255,255,255,0.31)',
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 2,
                        },
                    }
                },
                barWidth: '40',
                data: [100]
            }
        ]
        })
    }

}

class DataType {
    biddingTotalWeight: number
    importTotalWeight: number
    projectId: number
}
