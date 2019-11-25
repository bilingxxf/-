import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { InvoiceTypes } from '../../../../constant/invoice-types.enum'
import { InvoiceService } from '../../../../core/invoice/invoice.service'
import { InvoiceKpiReqDto } from '../../../../core/invoice/invoice-kpi-req-dto'
import { init } from 'echarts'
import * as echarts from 'echarts';
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'

@Component({
    selector: 'app-receipt-and-invoice-pie-chart',
    templateUrl: './receipt-and-invoice-pie-chart.component.html',
})
export class ReceiptAndInvoicePieChartComponent implements OnInit {

    @ViewChild('echart') dom: ElementRef

    @Input() projectId: number
    @Input() companyId: number
    @Input() type: InvoiceTypes
    rate: number
    tableData: any[] = []
    constructor(
        private invoiceService: InvoiceService,
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async fetchData() {
        return Promise.all([
            this.invoiceService.getKpiData({
                projectId: this.projectId,
                companyId: this.companyId,
                type: InvoiceTypes['收款']
            }),
            // this.invoiceService.getKpiData({
            //     projectId: this.projectId,
            //     companyId: this.companyId,
            //     type: InvoiceTypes['开票']
            // }),
        ])
    }

    async ngOnInit() {
        // const responses = await this.fetchData(); 
        let values = [];
        const data: DataType = await this.http.get(`/invoice-reports/project-reports?${this.utilService.objToSearch({
            projectId: this.projectId,
            companyId: this.companyId,
            type: 1
        })}`)
        .toPromise()
        this.rate = Number((data.totalAmount / data.contractAmount).toFixed(2))
        values = (data.totalAmount==0|| data.contractAmount==0) ?[0]:[((data.totalAmount / data.contractAmount)*100).toFixed(2)]
        this.tableData.push(data)
        this.tableData = this.tableData.filter(v => {
            return v.percent = ((data.totalAmount / data.contractAmount)*100).toFixed(0)
        });
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
    contractAmount: number
    totalAmount: number
}
