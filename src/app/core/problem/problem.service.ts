import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { ProblemQueryDto } from './problem-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { Problem } from '@core/problem/problem'
import { ProblemDetail } from './problem-detail'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ProblemService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  async d(id: number): Promise<ProblemDetail> {
    return await this.http.get(`/problems/reports/${id}`)
      .map((res: ProblemDetail) => plainToClass(ProblemDetail, res))
      .toPromise()
  }

  async list(dto: ProblemQueryDto): Promise<PagingData<ProblemDetail>> {
    const data: PagingData<ProblemDetail> = await this.http.get(`/problems/reports/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
    data.data = plainToClass(ProblemDetail, data.data)
    return data
  }

  close(id: number): Promise<void> {
    return this.http.put(`/problems/reports/${id}`, {}).toPromise()
  }

  list2(dto: ProblemQueryDto): Promise<PagingData<Problem>> {
    return this.http.get(`/problems/reports/departments/actions/list?${this.utilService.objToSearch(dto)}`).toPromise()
  }

}
