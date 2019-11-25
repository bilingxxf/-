import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { ContactLetterCDto } from '@core/contact-letter/contact-letter-c-dto'
import { UserService } from '../user/user.service'
import { ContactLetterQueryDto } from './contact-letter-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { ContactLetter } from './contact-letter'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { ContactLetterDetail } from './contact-letter-detail'

@Injectable()
export class ContactLetterService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  async c(dto: ContactLetterCDto): Promise<void> {
    const user = await this.userService.getCurrentUserInfo()
    dto.userId = user.id
    return this.http.post(`/contact-letters`, dto).toPromise()
  }

  async list(dto: ContactLetterQueryDto): Promise<PagingData<ContactLetter>> {
    dto.companyId = (await this.userService.getUser()).companyId
    return this.http.get(`/contact-letters/actions/list?${this.utilService.objToSearch(dto)}`)
      .do(data => data.data = plainToClass(ContactLetter, data.data))
      .toPromise()
  }

  f(id: number): Promise<ContactLetterDetail> {
    return this.http.get(`/contact-letters/${id}`)
      .map((res: ContactLetterDetail) => plainToClass(ContactLetterDetail, res))
      .toPromise()
  }



}
