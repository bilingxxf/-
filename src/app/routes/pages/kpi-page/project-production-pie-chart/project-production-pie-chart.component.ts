import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../../../core/util/util.service'
import { init } from 'echarts'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../../constant/variable.constant'

@Component({
  selector: 'app-project-production-pie-chart',
  templateUrl: './project-production-pie-chart.component.html',
})
export class ProjectProductionPieChartComponent implements OnInit {

    @ViewChild('echart') dom: ElementRef
    @Input() style: string
    @Input() projectId: number
    companyId: number
    tableData: any[] = []
    tableMake: any[] =[]
    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async ngOnInit() {
        // console.log(this.style) 
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) this.companyId = user.companyId
        let values = []
        if(this.style == '11') {
            const data: DataType = await this.http.get(`/manufacture-report/stat?${this.utilService.objToSearch({
                projectId: this.projectId,
                companyId: this.companyId
            })}`)
            .toPromise()
            this.tableData.push(data)
            this.tableData = this.tableData.filter(item => {
                return item.percent = ((item.manufacturedWeight/item.totalWeight)*100).toFixed(2)
            });
            values = (data.manufacturedWeight ==0 || data.totalWeight==0)?[0]:[((data.manufacturedWeight/data.totalWeight)*100).toFixed(2)]
        }
        if(this.style == '12') {
            const data: DateMakeType = await this.http.get(`/setup-reports/project?${this.utilService.objToSearch({
                projectId: this.projectId,
                companyId: this.companyId
            })}`)
            .toPromise()
            this.tableMake.push(data)
            this.tableMake = this.tableMake.filter(item => {
                return item.percent = ((item.setupTotalAmount/item.contactTotalAmount)*100).toFixed(2)
            });
            values = (data.setupTotalAmount==0||data.contactTotalAmount==0)?[0] :[((data.setupTotalAmount/data.contactTotalAmount)*100).toFixed(2)]
        }
    

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
                                fontSize: 16,
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
    manufacturedArea: number
    manufacturedWeight: number
    totalArea: number
    totalWeight: number
}
class DateMakeType {
    contactTotalAmount: number
    manufacturedTotalAmount: number
    setupTotalAmount: number
}
