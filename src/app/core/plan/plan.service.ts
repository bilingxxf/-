import { Injectable } from '@angular/core'
import { UtilService } from '@core/util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { AreaDivisionCreateDto } from '@core/plan/area-division-create-dto'
import { AreaDivision } from '@core/plan/area-division'
import { SinglePlanCreateDto } from '@core/plan/single-plan-create-dto'
import { SinglePlan } from './single-plan'
import { PlanQueryByMonthQueryDto } from './plan-query-by-month-query-dto'
import { ProductDemandPlanListItem } from '@core/product-demand/product-demand-plan-list-item'
import { ProjectPlanDailyDTO } from './project-plan-daily.dto';
import { SetupPlanQueryDTO, SetupHistoryDTO } from './setup-plan.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductDemandPlanCDto } from '@core/product-demand/product-demand-plan-c-dto'
import { TaskDto } from '@core/product-demand/task-dto'
import { promise } from 'protractor';


@Injectable()
export class PlanService {
    plans: any[] = [];
    takes: any[] = [];
    visible$ = new BehaviorSubject<boolean>(false)
    boxes$ = new BehaviorSubject<any[]>([])


    constructor(
        private utilService: UtilService,
        private http: HttpClientService
    ) { }

    /**
     * 保存多个计划
     */
    savePlans(dto: SinglePlanCreateDto[]): Promise<number[]> {
        return Promise.all(dto.map(o => this.saveSinglePlan(o)))
    }

    /**
     * 保存单个计划
     *
     * @param dto
     */
    saveSinglePlan(dto: SinglePlanCreateDto): Promise<number> {
        return this.http.post('/plans', dto).toPromise()
    }

    /**
     * 通过单体id获取所有计划
     *
     * @param monomerId
     */
    getPlansByMonomerId(monomerId: number): Promise<{[key: number]: SinglePlan[]}> {
        return this.http.get(`/plans?${this.utilService.objToSearch({ monomerId })}`).toPromise()
    }

    /**
     * 保存计划和任务
     *
     * @param dto
     */
    saveSinglePlanTask(dto: SinglePlanCreateDto[]): Promise<number> {
        return this.http.post('/areas/divisions/save/area-plan', dto).toPromise()
    }

    /**
     * 通过单体id获取所有实施计划和任务
     *
     * @param monomerId
     */
    getPlanTaskByMonomerId(monomerId: number): Promise<{[key: number]: SinglePlan[]}> {
        return this.http.get(`/areas/divisions/list/area-plan?${this.utilService.objToSearch({ monomerId })}`).toPromise()
    }

    /**
     * 添加一个项目的施工区域
     *
     * @param dto
     */
    createAreaDivisions(dto: AreaDivisionCreateDto[]): Promise<number[]> {
        return Promise.all(dto.map(this.createSingalAreaDivision))
    }

    /**
     *  添加一个施工区域
     *
     *  @param dto
     */
    createSingalAreaDivision(dto: AreaDivisionCreateDto): Promise<number> {
        return this.http.post('/areas/divisions', dto).toPromise()
    }

    batchAreaDivision(dto: AreaDivisionCreateDto[]):Promise<number[]> {
        return this.http.post('/areas/divisions/actions/batch_save', dto).toPromise()
    }

    /**
     * 通过单体id获取区域划分
     *
     * @param monomerId
     */
    getMonomerAreasByMonomerId(monomerId: number): Promise<AreaDivision[]> { 
        return this.http.get(`/areas/divisions?${this.utilService.objToSearch({ monomerId })}`).toPromise()
    }

    // 修改计划区域
    editAreaPlan(id: number, areaName: string, coordinates: string,monomerId: number): Promise<AreaDivision[]> {
        return this.http.put(`/areas/divisions/${id}`, {areaName,coordinates,monomerId}).toPromise()
    }

    // async edit(query: InvoiceCDto):Promise<any> {
    //     return this.http.put(`/invoices/${query.id}`, query).toPromise();
    //   }
    

    // 删除计划区域
    deletePlan(id: number): Promise<AreaDivision[]> {
        return this.http.delete(`/areas/divisions/${id}`).toPromise()
    }

    // 制定实施计划 删除对应的区域
    deletePlansById(id: number): Promise<any> {
        return this.http.delete(`/areas/divisions/`+id).toPromise()
    }

    /**
     * 获取一个月的所有计划
     */
    getPlanByMonth(dto: PlanQueryByMonthQueryDto): Promise<{[date: string]: ProductDemandPlanListItem[]}> {
        return this.http.get(`/product-demand/plans/actions/query?${this.utilService.objToSearch(dto)}`).toPromise()
    }

    async getPlanBycalendar(query: PlanQueryByMonthQueryDto):Promise<any[]> {
        return await this.http.get(`/product-demand/plans/submit-days/actions/list?${this.utilService.objToSearch(query)}`).toPromise()
    }

    async getDailyPlan(query: ProjectPlanDailyDTO):Promise<any> {
        return await this.http.get(`/product-demand/plans/submit-records/actions/list?${this.utilService.objToSearch(query)}`).toPromise() 
    }

    async getDailyPlanDetail(query: ProjectPlanDailyDTO):Promise<any> {
        return await this.http.get(`/product-demand/plans/detail?${this.utilService.objToSearch(query)}`).toPromise();
    }

    async getDailyDetail(monomerId: number, submitTime: string):Promise<any> {
        return await this.http.get(`/product-demand/plans/detail?monomerId=${monomerId}&queryTime=${submitTime}`).toPromise()
    }

    async getSetupPlan(query: SetupPlanQueryDTO) {
        return await this.http.get(`/products/setup-plans/records/actions/list?${this.utilService.objToSearch(query)}`).toPromise();
    }

    async getHistoryPlans(query: SetupHistoryDTO):Promise<any> {
        return await this.http.get(`/products/setup-plans/history/actions/list?${this.utilService.objToSearch(query)}`).toPromise()
    }

    async getHistoryDetail(query: SetupHistoryDTO):Promise<any> {
        return await this.http.get(`/products/setup-plans/history/detail?${this.utilService.objToSearch(query)}`).toPromise();
    }

    async getSetupPlanDetail(query: SetupPlanQueryDTO) {
        return await this.http.get(`/products/setup-plans/detail?${this.utilService.objToSearch(query)}`).toPromise();
    }

    addplan(item: ProductDemandPlanCDto) {
        const plan = this.plans.find(val => {
            return val.productId === item.productId
        })
        // if (plan && plan.current !== item.current) {
        //     plan.quantity += item.quantity;
        //     this.visible$.next(true);
        // } else if (!plan) {
        //     this.plans.push(item);
        //     this.visible$.next(true);
        // }
        this.plans.push(item);
        this.visible$.next(true);
      }

      //保存任务

      addplan1(item: TaskDto) {
        const plan1 = this.takes.find(val => {
            return val.productId === item.productId
        })
        // if (plan && plan.current !== item.current) {
        //     plan.quantity += item.quantity;
        //     this.visible$.next(true);
        // } else if (!plan) {
        //     this.plans.push(item);
        //     this.visible$.next(true);
        // }
        this.takes.push(item);
        this.visible$.next(true);
      }

      // 单体下的计划查看列表 GET /api/plans/gather
    getPlansList(monomerId: number): Promise<any> {
        return this.http.get(`/plans/gather?${this.utilService.objToSearch({ monomerId })}`).toPromise()
    }

      // 完成单体下对应类型的任务
    finishPlan(dto): Promise<number> {
        return this.http.post('/plans/finish', dto).toPromise()
    }

    // 查看单体下的某种类型任务完成剩余天数
    remainNumber(dto){
        return this.http.get(`/plans/gather/type?${this.utilService.objToSearch(dto)}`).toPromise()
    }
}
