import { Component, OnInit } from '@angular/core'
import { MonomerService } from '@core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { PlanService } from '@core/plan/plan.service'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProjectService } from '@core/project/project.service'
import { ComponentBusinessEntrySummary } from '@core/product/component-business-entry-summary'
import { ProductService } from '../../../core/product/product.service'

@Component({
  selector: 'app-business-entry-page',
  templateUrl: './business-entry-page.component.html',
})
export class BusinessEntryPageComponent implements OnInit {
    _active = 1;
    set active(val) {
        this._active = val;
        this.currentArea = null;
    }
    get active() {
        return this._active;
    }

    _currentMonomers: Monomer;

    set currentMonomers(val) {
        this._currentMonomers = val;
        this.currentArea = null;
        // console.log(val,'父组件----------')
        this.getData()
        this.setProjectTotalPrice()
    }
    get currentMonomers() {
        return this._currentMonomers
    }

    projectPrice: string
    sumPrice: any = {
        structureMonomerPrice: 0,
        containmentMonomerPrice: 0,
        totalMonomerPrice: 0,
        projectPrice: 0,
        structureMonomerSitePrice: 0,
        containmentMonomerSitePrice: 0,
        totalMonomerSitePrice: 0,
        projectSitePrice: 0
    }

    projectId: number

    structureSummary = new ComponentBusinessEntrySummary()

    pageMonomers: PageMonomer[] = []


    

    _currentType: any
    set currentType(val) {
        this._currentType = val
        // console.log(this._currentType,'类型---------------')
    }

    get currentType() {
        return this._currentType
    }

    Array = Array

    currentArea: any
    areas: any[];

    monomers: any[]
    summary: any
    leftSelectedIndex: number = 0

    leftTabs: any = [{
        name: '结构',
        value: 'structure',
        index: 0
    },
    {
        name: '围护',
        value: 'enclosure',
        index: 1
    }]
    types: any = [{
        name: '商务录入',
        id: 1
    }, {
        name: '安装商务跟踪',
        id: 2
    }]
    isSpinning:boolean = false
    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute,
        private planService: PlanService,
        private projectService: ProjectService,
        private productService: ProductService
    ) { }

    async getData() {
        this.currentType = this.types[0]
        // this.isSpinning = true
        // try {
        //     this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomers.id);
        //     this.summary = await this.productService.getComponentBusinessEntrySummary(this.currentMonomers.id);
        //     if(!this.summary.items || !(this.summary.items instanceof Array)){
        //         this.summary.items = []
        //     }
        // } catch (e) {
        //     console.log(e)
        // } finally {
        //     this.isSpinning = false
        // }
        // this.currentArea = this.areas[0];
    }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        this.monomers = await this.monomerService.getByProjectId(this.projectId)
        this.currentMonomers = this.monomers[0];
        this.setProjectTotalPrice();
        
        // this.currentType = this.types[0]
    }

    /**
     * 获取项目总价
     */
    async setProjectTotalPrice(): Promise<void> {
        // const dto = await this.projectService.getProjectTotalPrice(this.projectId)
        // this.projectPrice =  [
        //     `成品综合总价: ${(dto.totalFinishedProductPrice / 10000).toFixed(2)}万元`,
        //     `安装综合总价: ${(dto.totalUnitFixPrice / 10000).toFixed(2)}万元`,
        //     `项目总价: ${((dto.totalFinishedProductPrice + dto.totalUnitFixPrice) / 10000).toFixed(2)}万元`
        // ].join(',   ')

        const sumPrice = await this.projectService.getMonomerIdTotalPrice(this.currentMonomers.id)
        for(let i in sumPrice) {
            sumPrice[i] = Number(sumPrice[i]/10000).toFixed(2)
        }
        this.sumPrice = sumPrice
    }

    /**
     * 区域合计
     */
    async setStructureSummary() {
        return Promise.all(this.pageMonomers.map(async o => {
            o.summary = await this.productService.getComponentBusinessEntrySummary(o.monomer.id)
        }))
    }
}

class PageMonomer {
    monomer: Monomer

    summary: ComponentBusinessEntrySummary

    areas: AreaDivision[] = []
}
