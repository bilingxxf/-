import { Injectable } from '@angular/core'
import { SecurityLogCDto } from './security-log-c-dto'
import { UtilService } from '../util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UserService } from '../user/user.service'
import { SecurityLogListItem } from './security-log-list-item'
import { SecurityLogListReqDto } from './security-log-list-req-dto'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { SecurityLogDetail } from './security-log-detail'

@Injectable()
export class SecurityLogService {

  constructor(
    private utilService: UtilService,
    private http: HttpClientService,
    private userService: UserService
  ) { }

  async c(dto: SecurityLogCDto): Promise<void> {
    dto.userId = (await this.userService.getUser()).id
    return this.http.post(`/safety-logs`, dto).toPromise()
  }

  async getList(dto: SecurityLogListReqDto): Promise<SecurityLogListItem[]> {
    return this.http.get(`/safety-logs/actions/list?${this.utilService.objToSearch(dto)}`)
      .map(res => plainToClass(SecurityLogListItem, res))
      .toPromise()
  }

  d(id: number): Promise<SecurityLogDetail> {
    return this.http.get(`/safety-logs/${id}`)
      .map((res: SecurityLogDetail) => plainToClass(SecurityLogDetail, res))
      .toPromise()
  }
}
