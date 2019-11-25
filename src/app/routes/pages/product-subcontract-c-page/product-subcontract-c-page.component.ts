import { Component, OnInit } from '@angular/core'
import { NzModalService, NzMessageService, UploadChangeParam } from 'ng-zorro-antd'
import { DistributionModalComponent } from './distribution-modal/distribution-modal.component'
import { MonomerService } from '@core/monomer/monomer.service'
import { ActivatedRoute } from '@angular/router'
import { Subcontractor } from '../../../core/subcontractor/subcontractor'
import { SubcontractorService } from '../../../core/subcontractor/subcontractor.service'
import { Colors } from '../../../constant/colors.constant'
import { Monomer } from '../../../core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ProductSubcontract } from '@core/product/product-subcontract'
import { PlanService } from '../../../core/plan/plan.service'
import { ProductService } from '../../../core/product/product.service'
import { ProductTypes } from '../../../constant/product-types.enum'
import { Box } from '@shared/component/multi-color-box-list/box'
import { UtilService } from '../../../core/util/util.service'
import { ProductSubcontractBatchSaveReqDto } from '../../../core/product-subcontract/product-subcontract-batch-save-req-dto'
import { ProductSubcontractService } from '@core/product-subcontract/product-subcontract.service'
import { ProjectService } from '@core/project/project.service'

@Component({
    selector: 'app-product-subcontract-c-page',
    templateUrl: './product-subcontract-c-page.component.html',
    styleUrls: ['./product-subcontract-c-page.component.less']
})
export class ProductSubcontractCPageComponent implements OnInit {

    active = 1

    Array = Array

    subcontractors: Array<Subcontractor & {color: string}> = []

    submitting = false

    projectId: number

    pageMonomers: PageMonomer[] = []

    currentMonomers = new PageMonomer()

    constructor(
        private monomerService: MonomerService,
        private route: ActivatedRoute,
        private modal: NzModalService,
        private subcontractorService: SubcontractorService,
        private productSubcontractService: ProductSubcontractService,
        private planService: PlanService,
        private productService: ProductService,
        private utilService: UtilService,
        private msg: NzMessageService
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(({ id }) => this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId)
        this.subcontractors = (await this.subcontractorService.getAll()).map((o, i) => Object.assign(o, {color: Colors[i]})) // 设置分包商颜色
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            const enclosureSubcontracts = await this.productService.getProductSubtract(monomer.id, ProductTypes.围护)
            const enclosureBoxs = enclosureSubcontracts.map((o, i) => {
                const box = o.toBox(this.subcontractors)
                box.content = [o.name, o.modelNum, o.quantity].join(' ')
                box.click = () => this.open(o, enclosureBoxs, i)
                return box
            })
            const supportMaterialSubcontracts = await this.productService.getProductSubtract(monomer.id, ProductTypes.辅材)
            const supportMaterialBoxs = supportMaterialSubcontracts.map((o, i) => {
                const box = o.toBox(this.subcontractors)
                box.content = [o.name, o.material, o.quantity].join(' ')
                box.click = () => this.open(o, supportMaterialBoxs, i)
                return box
            })
            return {
                enclosureBoxs,
                enclosureSubcontracts,
                supportMaterialBoxs,
                supportMaterialSubcontracts,
                monomer,
                areas: await Promise.all(areas.map(async area => {
                    const productSubcontracts = await this.productService.getProductSubtract(area.id, ProductTypes.结构)
                    const boxs = productSubcontracts.map((o, i) => {
                        const box = o.toBox(this.subcontractors)
                        box.click = () => this.open(o, boxs, i)
                        return box
                    })
                    return { area, boxs, productSubcontracts }
                }))
            }
        }))
        this.currentMonomers = this.pageMonomers[0]
    }

    ok() { }

    async open(product: ProductSubcontract, boxs: Box[], index: number) {
        this.modal.create({
            nzTitle: '分包',
            nzContent: DistributionModalComponent,
            nzComponentParams: {
                product
            },
            nzOnOk: async () => {
                Object.assign(boxs[index], product.toBox(this.subcontractors))
            },
            nzWidth: 800,
            nzFooter: null
        })
    }

    getSubcontractorColor(subcontractorId?: number): string {
        return this.subcontractors.find(o => o.id === subcontractorId).color
    }

    // 注释 TODO
    async batchSave(area: PageArea) {
        const dto = new ProductSubcontractBatchSaveReqDto()
        dto.subcontractorId = await this.utilService.openSelectKvModal('选择分包商', this.subcontractors.map(o => ({
            k: o.name,
            v: o.id
        })))
        dto.productBatchSubcontractList = area.productSubcontracts.map(o => ({
            productId: o.id,
            quantity: o.getLeft()
        }))
        try {
            await this.productSubcontractService.batchSave(dto)
            area.productSubcontracts.forEach(o => {
                o.subcontractDetailList.push({
                    subcontractorId: dto.subcontractorId,
                    name: o.name,
                    quantity: o.getLeft()
                })
            })
            area.boxs = area.productSubcontracts.map(o => Object.assign(o, o.toBox(this.subcontractors)))
            this.msg.success('批量分包成功')
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    async enclosureBatchSave(pm: PageMonomer) {
        const dto = new ProductSubcontractBatchSaveReqDto()
        dto.subcontractorId = await this.utilService.openSelectKvModal('选择分包商', this.subcontractors.map(o => ({
            k: o.name,
            v: o.id
        })))
        dto.productBatchSubcontractList = pm.enclosureSubcontracts.map(o => ({
            productId: o.id,
            quantity: o.getLeft()
        }))
        try {
            await this.productSubcontractService.batchSave(dto)
            pm.enclosureSubcontracts.forEach(o => {
                o.subcontractDetailList.push({
                    subcontractorId: dto.subcontractorId,
                    name: o.name,
                    quantity: o.getLeft()
                })
            })
            pm.enclosureBoxs = pm.enclosureSubcontracts.map(o => Object.assign(o, o.toBox(this.subcontractors)))
            this.msg.success('批量分包成功')
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }

    async supportMaterialBatchSave(pm: PageMonomer) {
        const dto = new ProductSubcontractBatchSaveReqDto()
        dto.subcontractorId = await this.utilService.openSelectKvModal('选择分包商', this.subcontractors.map(o => ({
            k: o.name,
            v: o.id
        })))
        dto.productBatchSubcontractList = pm.supportMaterialSubcontracts.map(o => ({
            productId: o.id,
            quantity: o.getLeft()
        }))
        try {
            await this.productSubcontractService.batchSave(dto)
            pm.supportMaterialSubcontracts.forEach(o => {
                o.subcontractDetailList.push({
                    subcontractorId: dto.subcontractorId,
                    name: o.name,
                    quantity: o.getLeft()
                })
            })
            pm.supportMaterialBoxs = pm.supportMaterialSubcontracts.map(o => Object.assign(o, o.toBox(this.subcontractors)))
            this.msg.success('批量分包成功')
        } catch (e) {
            this.msg.error(e.error.message)
        }
    }
}

class PageMonomer {
    monomer: Monomer

    enclosureBoxs: Box[]

    enclosureSubcontracts: ProductSubcontract[]

    supportMaterialBoxs: Box[]

    supportMaterialSubcontracts: ProductSubcontract[]

    areas: PageArea[] = []
}

class PageArea {
    area: AreaDivision

    boxs: Box[]
    productSubcontracts: ProductSubcontract[]
}
