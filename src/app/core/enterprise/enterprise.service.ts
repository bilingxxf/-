import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { EnterpriseCDto } from '@core/enterprise/enterprise-c-dto'

@Injectable()
export class EnterpriseService {

    constructor(
        private http: HttpClientService
    ) { }

    c(dto: EnterpriseCDto) {
        return this.http.post('/companies', dto).toPromise()
    }
}
