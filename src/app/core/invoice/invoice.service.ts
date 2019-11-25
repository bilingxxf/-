import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { InvoiceCDto } from './invoice-c-dto'
import { InvoiceListItem } from './invoice-list-item'
import { InvoiceQueryDto } from '@core/invoice/invoice-query-dto'
import { plainToClass } from 'class-transformer'
import { InvoicePagingData } from '@core/invoice/invoice-paging-data'
import { InvoiceKpi } from '@core/invoice/invoice-kpi'
import { InvoiceKpiReqDto } from '@core/invoice/invoice-kpi-req-dto'
import { from } from 'rxjs/observable/from';

@Injectable()
export class InvoiceService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  c(dto: InvoiceCDto): Promise<void> {
    return this.http.post('/invoices', dto).toPromise()
  }

  list(dto: InvoiceQueryDto): Promise<InvoicePagingData> {
    return this.http.get(`/invoices/actions/query?${this.utilService.objToSearch(dto)}`)
      .do(res => {
        const sum = res.sum
        Object.assign(res, res.invoiceList)
        res.sum = sum
        res.data = plainToClass(InvoiceListItem, res.data)
      })
      .toPromise()
  }

  async remove(id: number):Promise<any> {
    return this.http.delete(`/invoices/${id}`).toPromise()
  }

  async edit(query: InvoiceCDto):Promise<any> {
    return this.http.put(`/invoices/${query.id}`, query).toPromise();
  }

  getKpiData(dto: InvoiceKpiReqDto): Promise<InvoiceKpi> {
    return this.http.get(`/invoice-reports/project-reports?${this.utilService.objToSearch(dto)}`)
      .map((res: InvoiceKpi) => plainToClass(InvoiceKpi, res))
      .toPromise()
  }
}
