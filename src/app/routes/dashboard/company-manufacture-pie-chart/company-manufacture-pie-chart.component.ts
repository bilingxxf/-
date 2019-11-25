import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../../core/util/util.service'
import { init } from 'echarts'

@Component({
  selector: 'app-company-manufacture-pie-chart',
  templateUrl: './company-manufacture-pie-chart.component.html',
})
export class CompanyManufacturePieChartComponent implements OnInit {
    @ViewChild('echart') dom: ElementRef
    @Input() companyId: number

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    async ngOnInit() {
        const data = await this.http.get(`/manufacture-report/actions/sum?${this.utilService.objToSearch({
            companyId: this.companyId
        })}`).toPromise();
        const rate = data.manufacturedTotalAmount / data.contactTotalAmount;
        init(this.dom.nativeElement).setOption({
            title: [{
                text: `制造 ${data.manufacturedTotalAmount}/${data.contactTotalAmount}`,
                textStyle: {
                    color: 'rgba(0,0,0,0.43)',
                    fontSize: 15,
                    fontWeight: 'bold'
                },
                textAlign: "center",
                left: '50%',
                bottom: '20%'
            }],
            series: [{
                type: 'pie',
                hoverAnimation: false,
                radius: ['79%', '80%'],
                startAngle: 225,
                labelLine: {
                    show: false
                },
                data: [{
                    value: rate * 270,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            formatter: (rate * 100).toFixed(2) + '%',
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
                    value: 270 - rate * 270,
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
