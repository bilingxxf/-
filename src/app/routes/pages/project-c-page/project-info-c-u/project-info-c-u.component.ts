import * as moment from 'moment'
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { MARGIN_TYPES } from '../../../../constant/margin-types.enum'
import { ORDER_TYPES } from '../../../../constant/order-types.enum'
import { STRUCT_TYPES } from '../../../../constant/struct-types.enum'
import { MonomerCreateDto } from '@core/project/monomer-create-dto'
import { ProjectInfoCDto } from '@core/project/project-info-c-dto'
import { FileTypes } from '../../../../constant/file-types.enum'
import { NzMessageService } from 'ng-zorro-antd'
import { LocationService } from '../../../../core/location/location.service'
import { LabelValue } from '@core/common-entity/label-value'
import { ProjectService } from '../../../../core/project/project.service'
let angularContent
@Component({
  selector: 'app-project-info-c-u',
  templateUrl: './project-info-c-u.component.html',
})
export class ProjectInfoCUComponent implements OnInit {

    location: number[] = []

    @Input() btnText = ''

    @Input() dto = new ProjectInfoCDto()

    @Output() onSubmitted = new EventEmitter<ProjectInfoCDto>()

    fileType = FileTypes.项目信息

    signTime = moment().startOf('d').toDate()

    startDate: string | Date = ''

    endDate: string | Date = ''

    uploading = false

    submitting = false

    marginTypes = MARGIN_TYPES

    orderTypes = ORDER_TYPES

    structTypes = STRUCT_TYPES

    _total = 0

    get total(): number {
        if (!this.startDate || !this.endDate) return this._total
        return moment(this.endDate).diff(moment(this.startDate), 'days') + 1
    }

    set total(val) {
        this._total = val
    }

    constructor(
        private msg: NzMessageService,
        private locationService: LocationService,
        private projectService: ProjectService
    ) { }

    async ngOnInit() {
        // this.dto.contractNo = await this.projectService.genContractNumber()
        angularContent = this
    }

    addMonomer() {
        this.dto.monomers.push(new MonomerCreateDto())
    }

    async ok() {
        if (this.dto.monomers.some(m => !m.name)) return this.msg.error('请填写单体名称')
        this.dto.signedDate = this.signTime.getTime()
        if (this.startDate) this.dto.startDate = (this.startDate as Date).getTime()
        if (this.endDate) this.dto.endDate = (this.endDate as Date).getTime()
        this.dto.countryId = this.location[0] || undefined
        this.dto.stateId = this.location[1] || undefined
        this.dto.cityId = this.location[2] || undefined
        this.dto.regionId = this.location[3] || undefined
        this.onSubmitted.emit(this.dto)
    }

    // async loadData1(e: {option: any, index: number, resolve: Function, reject: Function}) {
    //     if (e.index === -1) {
    //         e.resolve(await this.locationService.getCountries())
    //     }
    //     if (e.index === 0) {
    //         e.resolve(this.locationService.getStates(e.option.value))
    //     }
    //     if (e.index === 1) {
    //         e.resolve(this.locationService.getCities(e.option.parent.value, e.option.value))
    //     }
    //     if (e.index === 2) {
    //         const data = (await this.locationService.getRegions(e.option.value)).map(o => Object.assign(o, {isLeaf: true}))
    //         e.resolve(data)
    //     }
    // }

    loadData(node: any, index: number): PromiseLike<any> {
        return new Promise((resolve) => {
            if (index < 0) {
                angularContent.locationService.getCountries().then(data => {
                    node.children = data
                        resolve();
                })
            }
            if (index === 0) {
                angularContent.locationService.getStates(node.value).then(data =>{
                    node.children = data
                    resolve();
                })
            }
            if (index === 1) {
                 angularContent.locationService.getCities(node.parent.value, node.value).then(data => {
                    node.children = data
                    resolve();
                 })
            }
            if (index === 2) {
                angularContent.locationService.getRegions(node.value).then(data => {
                    const _data = data.map(o => Object.assign(o, {isLeaf: true}))
                    node.children = _data
                    resolve();
                })
            }
        });
      }

}
