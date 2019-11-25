import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core'
import { init } from 'echarts'
import * as _ from 'lodash'
import { TotalPregressListItem } from '@core/total-progress/total-pregress-list-item'

@Component({
  selector: 'app-total-progress-component-pie-chart',
  templateUrl: './total-progress-component-pie-chart.component.html',
})
export class TotalProgressComponentPieChartComponent implements OnInit {

    @ViewChild('echart') dom: ElementRef

    @Input() data: TotalPregressListItem[] = []

    height: number

    option = {
        title: [
            // {
            //     text: '南丁格尔玫瑰图',
            //     subtext: '纯属虚构',
            //     left: 200,
            //     top: 200,
            //     textAlign: 'center'
            // }
        ],
        tooltip : {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: [ '未开始', '制造', '入库', '安装']
        },
        series: [
        ]
    }

    constructor(
    ) { }

    ngOnInit() {
        const width: number = this.dom.nativeElement.offsetWidth
        const chartRadius = [40, 50]
        const spacing = 20
        const singleWidth = chartRadius[1] * 2 + spacing
        const offsetx = width % singleWidth / 2 + 60
        const offsety = 60
        const oneLineCount = Math.floor(width / singleWidth)
        const totalRaws = Math.ceil(this.data.length / oneLineCount)
        const fontSize = 16
        this.height = totalRaws * singleWidth + 60
        this.data.forEach((o, i) => {
            i = i + 1
            const raw = Math.ceil(i / oneLineCount)
            const col = i % oneLineCount || oneLineCount
            const centerX = chartRadius[1] / 2 + (col - 1) * singleWidth + offsetx
            const centerY = chartRadius[1] / 2 + (raw - 1) * singleWidth + offsety
            this.option.series.push({
                name: '访问来源',
                type: 'pie',
                radius : chartRadius,
                center: [centerX, centerY],
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data: [
                    {
                        value: o.finishedRecordQuantity,
                        name: '制造',
                        itemStyle: {
                            normal: {
                                color: '#D8436B'
                            }
                        }
                    },
                    {
                        value: o.inStockQuantity,
                        name: '入库',
                        itemStyle: {
                            normal: {
                                color: '#ED902C'
                            }
                        }
                    },
                    // {
                    //     value: o.outStockQuantity,
                    //     name: '出库',
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#ED902C'
                    //         }
                    //     }
                    // },
                    {
                        value: o.totalQuantity - o.finishedRecordQuantity - o.semiFinishedRecordQuantity,
                        name: '未开始',
                        itemStyle: {
                            normal: {
                                color: '#33D0E9'
                            }
                        }
                    },
                    {
                        value: o.setupQuantity,
                        name: '安装',
                        itemStyle: {
                            normal: {
                                color: '#3CA418'
                            }
                        }
                    }
                ]
            })
            this.option.title.push({
                text: `${o.name} * ${o.totalQuantity}`,
                subtext: o.serialNo,
                textStyle: {
                    fontSize: fontSize
                },
                left: centerX - 6,
                top: centerY - fontSize - 6,
                textAlign: 'center'
            })
        })
        setTimeout(() => {
            init(this.dom.nativeElement).setOption(this.option as any)
        }, 0)
    }

}
