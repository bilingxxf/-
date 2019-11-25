import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MonomerService } from '../../../../core/monomer/monomer.service'
import { Monomer } from '../../../../core/monomer/monomer'
import { SinglePlanCreateDto } from '@core/plan/single-plan-create-dto'
import { AreaDivisionCreateDto } from '../../../../core/plan/area-division-create-dto'
import { PlanType } from '../../../../constant/plan-type.enum'
import { UtilService } from '@core/util/util.service'
import { NzMessageService, NzNotificationService, NzListItemMetaComponent } from 'ng-zorro-antd'
import { PlanService } from '../../../../core/plan/plan.service'
import { log } from 'util';
import { constants } from 'os'

@Component({
  selector: 'app-implement-plan-create-page',
  templateUrl: './implement-plan-create-page.component.html'
})
export class ImplementPlanCreatePageComponent implements OnInit {
    _currentMonomer
    @Input()
    set currentMonomer(val) {
        this._currentMonomer = val.monomer.id;
        this.getPLanTask()
    }

    get currentMonomer() {
        return this._currentMonomer;
    }

    projectId: number

    submitting = false

    types = PlanType

    pageMonomers: PageMonomer[] = []
    pageMonomerData: any
    currentMonomers = new PageMonomer()
    
    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private utilService: UtilService,
        private msg: NzMessageService,
        private planService: PlanService,
        private notification: NzNotificationService,
        private router: Router
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.pageMonomers = monomers.map(m => {
            const pageMonomer = new PageMonomer()
            pageMonomer.monomer = m
            return pageMonomer
        })
        this.currentMonomers = this.pageMonomers[0]
        this._currentMonomer = this.currentMonomers.monomer.id
        this.getPLanTask()          
    }

    async getPLanTask() {
        this.pageMonomers[0].detailPlanWithAreas = []
        this.pageMonomerData = await this.planService.getPlanTaskByMonomerId(this._currentMonomer) // 获取所有的任务数据
        this.pageMonomerData = this.pageMonomerData.map((v, index) => {
            v.planResponseVS && v.planResponseVS.map(item => {
                item.planedFinishDate = item.planedFinishDate? new Date(item.planedFinishDate): null
                item.startDate = item.startDate? new Date(item.startDate): null
                return item
           })
           
            let obj = {
                area: new AreaDivisionCreateDto(v.monomerId),
                detailPlan: new SinglePlanCreateDto(this.types.详图深化计划, v.monomerId),
                makePlan: new SinglePlanCreateDto(this.types.生产计划, v.monomerId),
                setupPlan: new SinglePlanCreateDto(this.types.安装计划, v.monomerId) 
            }

            this.utilService.setClassFiled(obj.area, v)
            v.planResponseVS && v.planResponseVS.forEach(childItem => {
               if(childItem.type === 1) {
                this.utilService.setClassFiled(obj.detailPlan, childItem )
               }else if(childItem.type === 2) {
                this.utilService.setClassFiled(obj.makePlan, childItem )
               }else {
                this.utilService.setClassFiled(obj.setupPlan, childItem )
               }
            })
            
            this.pageMonomers[0].detailPlanWithAreas.push(obj)
            return v
        })
        // console.log(this.pageMonomers[0],'以前的数据格式--------')
        this.pageMonomers.forEach(pm => {
            // this.addArea(pm)
            this.utilService.iterateEnum(this.types).forEach(type => this.addPlan(pm, type)) // 每种类型的计划都添加一个
            for(let i in pm) {
                pm[i] = JSON.parse(JSON.stringify(pm[i]))
            }
        })
    }

    addArea(pm: PageMonomer) {
        pm.detailPlanWithAreas.push({
            area: new AreaDivisionCreateDto(pm.monomer.id),
            detailPlan: new SinglePlanCreateDto(this.types.详图深化计划, pm.monomer.id),
            makePlan: new SinglePlanCreateDto(this.types.生产计划, pm.monomer.id),
            setupPlan: new SinglePlanCreateDto(this.types.安装计划, pm.monomer.id) 
        })
    }

    addPlan(pm: PageMonomer, type: PlanType) {
        switch (type) {
            // case this.types.分包招标计划:
            //     pm.subcontractPenderingPlan.push(new SinglePlanCreateDto(type, pm.monomer.id))
            //     break
            // case this.types.物料采购计划:
            //     pm.materialPurchasePlan.push(new SinglePlanCreateDto(type, pm.monomer.id))
            //     break
        }
    }

    async ok() {
        this.submitting = true
        // 先保存分区
        try {
            await Promise.all(this.pageMonomers.map(async (pm, index) => {
                await this.saveArea(pm)

                // 设置区域相关的计划的区域id
                pm.detailPlanWithAreas.forEach(o => o.setupPlan.areaDivisionId=o.detailPlan.areaDivisionId = o.makePlan.areaDivisionId = o.area.id)

                // 计划一起保存
                // const plans = [...pm.materialPurchasePlan, ...pm.detailPlanWithAreas.map(o => o.makePlan), ...pm.subcontractPenderingPlan, ...pm.detailPlanWithAreas.map(o => o.detailPlan),...pm.detailPlanWithAreas.map(o=>o.setupPlan)]
                const plans = [ ...pm.detailPlanWithAreas.map(o => o.makePlan),  ...pm.detailPlanWithAreas.map(o => o.detailPlan),...pm.detailPlanWithAreas.map(o=>o.setupPlan)]
                const arr = []
                if(index === 0) {
                    pm.detailPlanWithAreas.forEach(item => {
                        let obj = {
                            areaName: item.area.areaName,
                            coordinates: item.area.coordinates,
                            id: item.area.id,
                            monomerId: this._currentMonomer,
                            tip: item.area.tip,
                            planRequestVS: []
                        }
                       
                        obj.planRequestVS.push(item.detailPlan, item.makePlan, item.setupPlan)
                        arr.push(obj)
                    })
                }
                
                if(arr && arr.length) {
                    // console.log(arr,'arrr------------')
                    for (const key in arr) {
                        if (arr.hasOwnProperty(key)) {
                            const element = arr[key];
                            if(!element.areaName) {
                                this.notification.error('请填写区域名称再保存', '')
                                break
                            }
                            console.log(element)
                        }
                    }

                    const data = await this.planService.saveSinglePlanTask(arr)
                    if(data) {
                        this.notification.success('保存成功', '')
                        this.getPLanTask()
                    }
                }else {
                    return
                }
                
                this.submitting = false
            })) 
            // console.log(this.pageMonomers, '计划列表数据----------------')
            // this.router.navigate(['/implement-plan-detail', this.projectId])
        } catch (e) {
            this.submitting = false
            // console.log(e)
            this.msg.error(e.error.message)
        }
    }

    async deleteHandle(item) { // 删除区域
        const data = await this.planService.deletePlansById(item)
        if(data) {
            this.getPLanTask()
            this.notification.success('删除成功！','')
        }else {
            this.notification.error(data.message, '')
        }
    }

    /**
     * 保存分区
     * 并设置id
     */
    private async saveArea(pm: PageMonomer): Promise<void> {
        const areas = pm.detailPlanWithAreas.map(o => o.area);
        // console.log(areas, '区域----------------')
        // const response: number[] = await this.planService.batchAreaDivision(areas);
        // areas.forEach((area, key) => {
        //     area.id = response[key]
        // });

        // await Promise.all(pm.detailPlanWithAreas.map(o => o.area).map(async areaCreateDto => {
        //     areaCreateDto.id = await this.planService.createSingalAreaDivision(areaCreateDto)
        // }))
    }

    /** 
     * 判断必填的是否都填了
     */
    canSubmit() {
        const areaDivisionOk: boolean = this.pageMonomers.every(pm => pm.detailPlanWithAreas.map(o => o.area).every(a => Boolean(a.areaName && a.coordinates && a.materialApproachTime)))

        const otherOk: boolean = this.pageMonomers.every(pm => {
            return [
                ...pm.detailPlanWithAreas.map(o => o.detailPlan),
                ...pm.detailPlanWithAreas.map(o => o.makePlan),
                // ...pm.materialPurchasePlan,
                // ...pm.subcontractPenderingPlan
            ].every(o => Boolean(o.name && o.startDate && o.planedFinishDate))
        })
        return areaDivisionOk && otherOk
    }
}

class PageMonomer {
    monomer: Monomer

    /** 物料采购计划 */
    // materialPurchasePlan: SinglePlanCreateDto[] = []

    /** 分包招标计划 */
    // subcontractPenderingPlan: SinglePlanCreateDto[] = []

    detailPlanWithAreas: {
        area: AreaDivisionCreateDto,
        detailPlan: SinglePlanCreateDto,
        makePlan: SinglePlanCreateDto, // 制造计划
        setupPlan:SinglePlanCreateDto, // 安装计划

    }[] = []
}
