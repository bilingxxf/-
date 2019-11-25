import { Component, OnInit } from '@angular/core'
import { PlanType } from '../../../constant/plan-type.enum'
import { ActivatedRoute } from '@angular/router'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { AreaDivision } from '../../../core/plan/area-division'
import { Monomer } from '@core/monomer/monomer'
import { SinglePlan } from '@core/plan/single-plan'
import { MonomerService } from '../../../core/monomer/monomer.service'
import { PlanService } from '../../../core/plan/plan.service'
import {Modil} from '../../pages/implement-plan-detail-page/Modil'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-implement-plan-detail-page',
  templateUrl: './implement-plan-detail-page.component.html',
})
export class ImplementPlanDetailPageComponent implements OnInit {
    projectId: number
    types = PlanType
    id:object
    areaId: number
    validateForm: FormGroup;
    editForm: any = {}
    isVisible = false
    loading = false
     //修改
    async showModal(item,id) {
        this.modal.create({
            nzTitle: `请修改时间`,
            nzWidth: 600,
            nzComponentParams: { item},
            nzContent: Modil,
            nzFooter: null
        })
    }
    async requestId(){
        // this.data = await this.cargoListService.list(this.dto)
        // this.CargoListService.updata()
    }

    pageMonomers: PageMonomerDetail[] = []

    _currentMonomers = new Monomer()
    set currentMonomers(val) {
        this._currentMonomers = val;
        this.getData()
    }
    get currentMonomers() {
        return this._currentMonomers;
    }
    
     
    
    monomers: Monomer[] = []
    areas: AreaDivision[] = []

    plans = {
        rawMaterialPurchasePlan: [],

        materialPurchasePlan: [],
    
        subcontractPenderingPlan: [],
    
        detailPlan: [],
        installation:[]
    }

    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService,
        private modal: NzModalService,
        private message: NzMessageService,
        private fb: FormBuilder
    ) { }
    
    
    async getData() {
        // this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomers.id);
        // const responses = await this.planService.getPlansByMonomerId(this.currentMonomers.id);
        // console.log(this.areas, 'areas-----------------------------')
        // console.log(responses, '计划详情------------')
        // this.plans = {
        //     rawMaterialPurchasePlan: responses[this.types.生产计划],
        //     materialPurchasePlan: responses[this.types.物料采购计划],
        //     subcontractPenderingPlan: responses[this.types.分包招标计划],
        //     detailPlan: responses[this.types.详图深化计划],
        //     installation:responses[this.types.安装计划]
            
        // }
        this.loading = true
        this.areas = await this.planService.getPlansList(this.currentMonomers.id) // 获取计划查看
        if(this.areas && this.areas.length) {
            this.loading = false
            this.areas = this.areas.map(item => {
                item.typeName = item.type === 1? '图纸深化': (item.type === 2? '生产计划': '安装计划')
                return item
            })
        }else {
            this.loading = false
        }
        // console.log(this.areas,'this.areas---------------')
    }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id);
        this.monomers = await this.monomerService.getByProjectId(this.projectId);
        this.currentMonomers = this.monomers[0]
        this.editForm = {
            id: null,
            areaName: null,
            coordinates: null,
            monomerId: this.currentMonomers.id
        }
    }

    editPlan(item) {
        this.isVisible = true
        this.editForm.id = item.id
        this.editForm.areaName = item.areaName
        this.editForm.coordinates = item.coordinates
        console.log(item, '计划修改============')

    }
    handleOk(){
        this.planService.editAreaPlan(this.editForm.id,this.editForm.areaName, this.editForm.coordinates, this.editForm.monomerId).then(res => {
            if(res) {
                this.isVisible = false
                this.message.success('修改成功')
                this.getData()
            }
        }).catch(err => {
            this.isVisible = false
        })
    }

    handleCancel() {
        this.isVisible = false
    }

    // remove(item) {
    //     this.planService.deletePlan(item.id).then(res => {
    //         if(res) {
    //             this.message.success('删除成功')
    //             this.getData()
    //         }
    //     })
    //     // console.log(item, '删除区域计划')
    // }

    async finishHandle(item) {
        const dto = {
            monomerId: this.currentMonomers.id,
            type: item.type
        }
        const data = await this.planService.finishPlan(dto)
        this.getData()
    }
    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }
}

class PageMonomerDetail {
    monomer: Monomer

    areas: AreaDivision[]

    rawMaterialPurchasePlan: SinglePlan[] = []

    materialPurchasePlan: SinglePlan[] = []

    subcontractPenderingPlan: SinglePlan[] = []

    detailPlan: SinglePlan[] = []
    installation: SinglePlan[] = []
}
