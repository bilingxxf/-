import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { PaymentRemind } from './payment-remind'
import { UtilService } from '../util/util.service'

@Injectable()
export class PaymentRemindService {

    constructor(
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * 通过项目id获取付款提醒
     *
     * @param projectId
     */
    getByProjectId(projectId: number): Promise<PaymentRemind[]> {
        return this.http.get(`/payments/reminds?${this.utilService.objToSearch({ projectId })}`).toPromise()
    }
}
