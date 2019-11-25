import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UserService } from '@core/user/user.service'
import { InvoiceTypes } from '../../constant/invoice-types.enum'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../../core/util/util.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    companyId: number
    invoiceTypes = InvoiceTypes
    report: any = {}
    constructor(
        private http: HttpClientService,
        private utilService: UtilService,
        private userService: UserService
    ) { }

    async ngOnInit() {
        this.companyId = (await this.userService.getUser()).companyId
        this.report= await this.http.get(`/project-reports${this.utilService.objToSearch({
            // companyId: this.companyId
        })}`).toPromise()
        this.report.totalProductWeight = Math.round(this.report.totalProductWeight/1000)
        this.report.finishProductWeight = Math.round(this.report.finishProductWeight/1000)
    }

}
