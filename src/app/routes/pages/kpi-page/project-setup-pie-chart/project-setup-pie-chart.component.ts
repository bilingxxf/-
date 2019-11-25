import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'
// import { type } from 'os';


@Component({
  selector: 'app-project-setup-pie-chart',
  templateUrl: './project-setup-pie-chart.component.html',
})
export class ProjectSetupPieChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() projectId: number
    @Input() companyId: number
    tableData: any = []

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async ngOnInit() {
        let values = []
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        const data = await this.http.get(`/setup-reports/actions/sum?${this.utilService.objToSearch({
            projectId: this.projectId,
            companyId: this.companyId,
        })}`)
        .toPromise()
        this.tableData.push(data)
        this.tableData = this.tableData.filter(v => {
            return v.percent = ((data.setupTotalWeight / data.structureTotalWeight)*100).toFixed(2)
        })
        // if(data.setupTotalWeight == 0 || data.structureTotalWeight) {
        //     values = [0]
        // }else {
        //     values = (data.setupTotalWeight == 0 || data.structureTotalWeight)[((data.setupTotalWeight / data.structureTotalWeight)*100).toFixed(2)]

        // }
        values = (data.setupTotalWeight ==0 || data.structureTotalWeight==0)?[0]:[((data.setupTotalWeight/data.structureTotalWeight)*100).toFixed(2)]        
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
