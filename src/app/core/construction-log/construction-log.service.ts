import { Injectable } from '@angular/core'
import { HttpClientService } from '../http-client/http-client.service'
import { ConstructionLogCreateDto } from '@core/construction-log/construction-log-create-dto'
import { ConstructionLogQueryDto } from './construction-log-query-dto'
import { ConstructionLog } from '@core/construction-log/construction-log'
import { UtilService } from '../util/util.service'
import { UserService } from '@core/user/user.service'
import { plainToClass } from '../../../../node_modules/class-transformer'
import { ConstructionLogDetail } from './construction-log-detail'
import { ConstructionLogExportDto } from './construction-log-export-dto'

@Injectable()
export class ConstructionLogService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  c(dto: ConstructionLogCreateDto): Promise<void> {
    return this.http.post('/constructions/logs', dto).toPromise()
  }

  async list(dto: ConstructionLogQueryDto): Promise<ConstructionLog[]> {
    dto.userId = (await this.userService.getUser()).id
    return this.http.get(`/constructions/logs/actions/query?${this.utilService.objToSearch(dto)}`)
      .map(res => plainToClass(ConstructionLog, res))
      .toPromise()
  }

  async getDetail(id: number): Promise<ConstructionLogDetail> {
    return this.http.get(`/constructions/logs/${id}`)
      .map((res: ConstructionLogDetail) => plainToClass(ConstructionLogDetail, res))
      .toPromise()
  }

  getExportUrl(dto: ConstructionLogExportDto): string {
    return `/api/constructions/logs/actions/export?${this.utilService.objToSearch(dto)}`
  }


}
