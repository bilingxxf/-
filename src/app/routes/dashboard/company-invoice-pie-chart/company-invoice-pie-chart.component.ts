import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { init } from 'echarts'
import { UtilService } from '../../../core/util/util.service'

@Component({
  selector: 'app-company-invoice-pie-chart',
  templateUrl: './company-invoice-pie-chart.component.html',
})
export class CompanyInvoicePieChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef

    @Input() companyId: number

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async ngOnInit() {
        const data = await this.http.get(`/invoice-reports/company-reports?${this.utilService.objToSearch({
            companyId: this.companyId
        })}`)
        .toPromise()
        const receipt_rate = data[0].totalAmount / data[0].contractAmount;
        const invoice_rate = data[1].totalAmount / data[1].contractAmount;
        init(this.dom.nativeElement).setOption({
            title: [{
                text: `收款 ${data[0].totalAmount}/${data[0].contractAmount}`,
                textStyle: {
                    color: 'rgba(0,0,0,0.43)',
                    fontSize: 15,
                    fontWeight: 'bold'
                },
                textAlign: "center",
                left: '25%',
                bottom: '20%'
            }, {
                text: `开票 ${data[1].totalAmount}/${data[1].contractAmount}`,
                textStyle: {
                    color: 'rgba(0,0,0,0.43)',
                    fontSize: 15,
                    fontWeight: 'bold'
                },
                textAlign: "center",
                left: '75%',
                bottom: '20%'
            }],
            series: [{
                type: 'pie',
                hoverAnimation: false,
                radius: ['54%', '55%'],
                center: ['25%', '50%'],
                startAngle: 225,
                labelLine: {
                    show: false
                },
                data: [{
                    value: receipt_rate * 270,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: (receipt_rate * 100).toFixed(2) + '%',
                            textStyle: {
                                color: '#000',
                                fontSize: 30,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#2F9CFF',
                            borderWidth: 5
                        }
                    }
                }, {
                    value: 270 - receipt_rate * 270,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(250,250,250,1)',
                            borderWidth: 5
                        }
                    }
                }, {
                    value: 90,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                }],
            }, {
                type: 'pie',
                hoverAnimation: false,
                radius: ['54%', '55%'],
                center: ['75%', '50%'],
                startAngle: 225,
                labelLine: {
                    show: false
                },
                data: [{
                    value: invoice_rate * 270,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: (invoice_rate * 100).toFixed(2) + '%',
                            textStyle: {
                                color: '#000',
                                fontSize: 30,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#2F9CFF',
                            borderWidth: 5
                        }
                    }
                }, {
                    value: 270 - invoice_rate * 270,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(250,250,250,1)',
                            borderWidth: 5
                        }
                    }
                }, {
                    value: 90,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)'
                        }
                    }
                }],
            }]
        } as any)
    }

}
