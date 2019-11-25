import { Component, OnInit } from '@angular/core'
import { MonomerService } from '@core/monomer/monomer.service'
import { PlanService } from '@core/plan/plan.service'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProjectService } from '@core/project/project.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-production-mgmt-page',
  templateUrl: './production-mgmt-page.component.html'
})
export class ProductionMgmtPageComponent implements OnInit {
    active = 1;
    projectId: number = 0;
    pageMonomers: any[] = []
    _currentMonomers: Monomer;

    set currentMonomerss(val) {
        this._currentMonomers = val;
        this.getAreas()
    }
    get currentMonomerss() {
        return this._currentMonomers;
    }

    monomers: Monomer[] = []
    areas: any[] = []
    currentMonomers: any
    remainNumber: any 
    constructor(
        private route: ActivatedRoute,
        private monomerService: MonomerService,
        private planService: PlanService,
        private projectService: ProjectService
    ) { }

    async getAreas() {
        this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomerss.id);
        // 获取计划剩余天数
        const dto = {
            type: 2,
            monomerId: this.currentMonomerss.id
        }
        this.remainNumber = await this.planService.remainNumber(dto)
        this.remainNumber = this.remainNumber !== null ? this.remainNumber: '--'
        // let editObj = {
        //     areaName: '修改记录',
        //     monomerId: this.currentMonomerss.id,
        //     type: 0
        // }
        // let delObj = {
        //     areaName: '删除记录',
        //     monomerId: this.currentMonomerss.id,
        //     type: 1
        // }
        // this.areas.push(editObj, delObj)
    }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
        this.currentMonomerss = this.monomers[0];

        // 以下内容是修改的
        this.pageMonomers = await Promise.all(this.monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            return { monomer, areas }
        }))
        this.currentMonomers = this.pageMonomers[0] 
    }

}

