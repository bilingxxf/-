import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { AreaDivision } from '@core/plan/area-division'
import { Monomer } from '@core/monomer/monomer'
import { MonomerService } from '../../../core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { PlanService } from '../../../core/plan/plan.service'
import { UploadChangeParam, NzNotificationService, NzMessageService } from 'ng-zorro-antd'
import { ComponentTableComponent } from './component-table/component-table.component'
import { SupportMaterialTableComponent } from './support-material-table/support-material-table.component'
import { ProductService } from '../../../core/product/product.service'
import { EnclosureTableComponent } from './enclosure-table/enclosure-table.component'
import { AreaComponentSummary } from '../../../core/product/area-component-summary-item'
import { ProjectService } from '@core/project/project.service'
import { EnclosureService } from '@core/enclosure/enclosure.service'


@Component({
  selector: 'app-inventory-import-page',
  templateUrl: './inventory-import-page.component.html',
  styles: [`
    .component-table .tags {
      display: block;
      float: right
    }

  `]
})
export class InventoryImportPageComponent implements OnInit {
    _leftSelectedIndex: number = 0
    leftTabs: any = [{
        name: '结构',
        value: 'structure',
        index: 0
    }, {
        name: '围护',
        value: 'enclosure',
        index: 1
    }, {
        name: '辅材',
        value: 'material',
        index: 2
    }]
    set leftSelectedIndex(val) {
        this._leftSelectedIndex = val;
        this.currentArea = null;
    }

    get leftSelectedIndex() {
        return this._leftSelectedIndex;
    }

    projectId: number

    Array = Array

    pageMonomers: PageMonomer[] = []

    monomers: any[] = [];
    areas: any[] = [];
    summary: any
    summaryEncl:any
    currentArea: any
    enclosureTab: any[] = []
    materialTab: any[] = []
    remainNumber: any
    _currentMonomer: Monomer
    
    set currentMonomer(val) {
        this._currentMonomer = val;
        this.currentArea = null;
        this.getData();
    }

    get currentMonomer() {
        return this._currentMonomer;
    }

    headers = {
        Authorization: `cat ${localStorage.getItem('building-token')}`
    }

    totalQuailty = 0;
    totalWeight = 0;
    

    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute,
        private planService: PlanService,
        private notification: NzNotificationService,
        private msg: NzMessageService,
        private productService: ProductService,
        private projectService: ProjectService,
        private enclosureService: EnclosureService
    ) { }

    async getData() {
        this.totalQuailty = 0;
        this.totalWeight = 0;
        this.enclosureTab = []
        this.materialTab = []
        this.areas = await this.planService.getMonomerAreasByMonomerId(this.currentMonomer.id);
        let editObj = {
            areaName: '修改记录',
            monomerId: this.currentMonomer.id,
            type: 0
        }
        let delObj = {
            areaName: '删除记录',
            monomerId: this.currentMonomer.id,
            type: 1
        }
        let surroundObj = {
            areaName: '围护清单',
            monomerId: this.currentMonomer.id,
            type: 4
        }
        let materialObj = {
            areaName: '辅材清单',
            monomerId: this.currentMonomer.id,
            type: 3
        }
        this.areas.push(editObj, delObj)
        this.enclosureTab.push(surroundObj, editObj, delObj)
        this.materialTab.push(materialObj, editObj, delObj)
        // console.log(this.areas,'hshdfhdsshanchu')
        // this.currentArea = this.areas[0];
        this.summary = await this.productService.getAreaComponentSummary(this.currentMonomer.id);
        this.summary.items.forEach((val) => {
            this.totalQuailty += val.totalQuantity;
            this.totalWeight += val.totalWeight;
        })
        this.totalWeight = Number((this.totalWeight / 1000).toFixed(2));
        // 围护合计数据
        this.summaryEncl = await this.enclosureService.getSummaryByMonomerId(this.currentMonomer.id)
        // 获取计划剩余天数
        const dto = {
            type: 1,
            monomerId: this.currentMonomer.id
        }
        this.remainNumber = await this.planService.remainNumber(dto)
        this.remainNumber = this.remainNumber !== null ? this.remainNumber: '--'
    }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id);
        this.monomers = await this.monomerService.getByProjectId(this.projectId);
        this.currentMonomer = this.monomers[0]
    }

    async setSummary() {
    }

    /**
     * 导入成功后获取列表
     *
     * @param e
     * @param table
     */
    async uploadComponentChange(e: UploadChangeParam, table: ComponentTableComponent | SupportMaterialTableComponent | EnclosureTableComponent) {
        if (e.file.status !== 'done') return
        const response = e.file.response
        if (response.code >= 400) return this.msg.error(response.message)

        // 先直接通过
        await this.productService.importConfirm(response.data, true)
        this.setSummary()
        table.reset()

        this.notification.success('导入成功', '')
    }

    /**
     * 导入操作
     *
     * @param e
     * @param table
     */
    async uploadChange(e: UploadChangeParam, monomer: Monomer) {
        const monomerId = monomer.id
        if (e.file.status !== 'done') return
        const response = e.file.response
        if (!response.success) return this.msg.error('导入失败')
        const fileName = response.saveName
        if (!await this.projectService.checkModelNameIsUnique(fileName)) return this.msg.error('文件名重复')
        const uploadResult = await this.projectService.uploadModel(monomerId, fileName)
        if (!uploadResult.success) return this.msg.error('导入失败')
        try {
            await this.monomerService.updateModel(monomer, uploadResult.projectId)
            this.msg.success('导入成功')
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    clickNode(element) {
        // console.log(this.test.nativeElement);
        // this.test.nativeElement.click();
    }
}

class PageMonomer {
    monomer: Monomer

    summary: AreaComponentSummary

    areas: AreaDivision[] = []
}
