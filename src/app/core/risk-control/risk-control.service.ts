import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../util/util.service'
import { RiskControlList, RiskControlItem } from '@core/risk-control/risk-control-list'
import { plainToClass } from '../../../../node_modules/class-transformer'
import * as _ from 'lodash'
import { RiskControlUploadReqDto } from './risk-control-upload-req-dto'
import { UserService } from '@core/user/user.service'

@Injectable()
export class RiskControlService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
    private userService: UserService
  ) { }

  async getAll(projectId: number): Promise<RiskControlList> {
    const data = await this.http.get(`/risk-controls?${this.utilService.objToSearch({projectId})}`)
      .map(res => plainToClass(RiskControlItem, res))
      .toPromise()
    return new RiskControlList(data)
  }

  async upload(dto: RiskControlUploadReqDto): Promise<void> {
    dto.userId = (await this.userService.getUser()).id
    return this.http.post(`/risk-controls`, dto).toPromise()
  }

}
