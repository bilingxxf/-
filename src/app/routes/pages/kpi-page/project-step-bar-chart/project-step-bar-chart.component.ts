import { Component, OnInit, ElementRef, ViewChild, Input, OnDestroy } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { init } from 'echarts'
import * as echarts from 'echarts';
import { ProjectStepBarChartService } from '@core/setp-bar-chart/project-step-bar-chart.service';

@Component({
  selector: 'app-project-step-bar-chart',
  templateUrl: './project-step-bar-chart.component.html',
})
export class ProjectStepBarChartComponent implements OnInit, OnDestroy {
    @ViewChild('echart') dom: ElementRef
    @Input() companyId: number
    @Input() projectId: number
    @Input() type: number
    tableData: any = [] 
    constructor(
        // private http: HttpClientService,
        // private utilService: UtilService, 
        private projectStepBarChartService: ProjectStepBarChartService
    ) { }

    ngOnDestroy() {
        this.projectId = null;
        this.projectStepBarChartService.promise = null;
    }

    async ngOnInit() { 
        let values = [];
        const data = await this.projectStepBarChartService.fetch(this.projectId);
        this.tableData.push(data)
        this.tableData = this.tableData.filter(item => {
            return item.percent = ((item.structureOutWeight/item.structureTotalWeight)*100).toFixed(2)
        });
        switch(this.type) {
            case 1:
                values = [data.structureInPercent ];
                break;
            case 2:
                values = [data.containmentInPercent ]
                break;
            case 3:
                values = (data.structureOutWeight==0||data.structureTotalWeight==0)?[0]: [((data.structureOutWeight/data.structureTotalWeight)*100).toFixed(2)]
                // values = ['80']
                break;
            case 4:
                values = [data.structureOutWeight]
                break;
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
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: '#00c0e9'
                            // }, {
                            //     offset: 1,
                            //     color: '#3b73cf'
                            // }]),
                            color: '#00B050',
                            // barBorderRadius: 50,
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
