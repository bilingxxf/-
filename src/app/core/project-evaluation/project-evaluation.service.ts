import { Injectable } from '@angular/core'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { ProjectEvaluationQueryDto } from './project-evaluation-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { ProjectEvaluationListItem } from '@core/project-evaluation/project-evaluation-list-item'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ProjectEvaluationService {

  constructor(
    private http: HttpClientService,
    private utilService: UtilService,
  ) { }

  async list(dto: ProjectEvaluationQueryDto): Promise<PagingData<ProjectEvaluationListItem>> {
    return this.http.get(`/projects/evaluations/actions/query?${this.utilService.objToSearch(dto)}`)
      .do(res => res.data = plainToClass(ProjectEvaluationListItem, res.data))
      .toPromise()
  }

}
