import { Injectable } from '@angular/core'
import { UtilService } from '../util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { CompanyDetail } from './company-detail'
import { plainToClass } from 'class-transformer'
import { CompanySetLogoDTO } from './company-set-logo.dto';

@Injectable()
export class CompanyService {

  constructor(
    private utilService: UtilService,
    private http: HttpClientService
  ) { }

  f(id: number): Promise<CompanyDetail> {
    return this.http.get(`/companies/${id}`)
      .map((res: CompanyDetail) => plainToClass(CompanyDetail, res))
      .toPromise()
  }

  async setLogo(query: CompanySetLogoDTO):Promise<any> {
    return this.http.put(`/companies/${query.id}/logos/actions/update?${this.utilService.objToSearch(query)}`, {}).toPromise()
  }

}
