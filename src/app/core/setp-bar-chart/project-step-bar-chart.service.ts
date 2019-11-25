import { Injectable } from '@angular/core';
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'

@Injectable()
export class ProjectStepBarChartService {
  loading:boolean = false;
  promise: Promise<any>

  constructor(
    private http: HttpClientService,
    private utilService: UtilService
  ) { }

  async fetch(projectId: number) {
    if (this.promise) {
      return this.promise
    } else {
      return this.promise = this.http.get(`/warehouse-reports?${this.utilService.objToSearch({
        projectId: projectId
      })}`).toPromise();
    }
  }

}
