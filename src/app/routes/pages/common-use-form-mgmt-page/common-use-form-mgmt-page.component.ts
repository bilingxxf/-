import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { delay } from 'rxjs/operators'
import * as moment from 'moment'
import { Component, OnInit, ViewChild } from '@angular/core'
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc'
import { User } from '@core/user/user'
import { LocalstorageUserKey } from '../../../constant/variable.constant'
import { RoleService } from '../../../core/role/role.service'
import { WarehousingQueryDto } from '../../../core/warehousing/warehousing-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { CargoList } from '@core/cargo-list/cargo-list'

@Component({
  selector: 'app-common-use-form-mgmt-page',
  templateUrl: './common-use-form-mgmt-page.component.html',
})
export class CommonUseFormMgmtPageComponent implements OnInit {

    data = new PagingData<CargoList>()
    date: any
    companyId: any
    isSpinning:boolean = false
    constructor(
        private roleService: RoleService
    ) { }

    ngOnInit() {
        const user: User = JSON.parse(localStorage.getItem(LocalstorageUserKey))
        if (user && user.companyId) {
            this.companyId = user.companyId 
        }
        this.date = new Date()
        this.getData()
    }

    dto = new WarehousingQueryDto()

    async getData() {
        this.isSpinning = true
        try {
            let nowDate = moment(this.date).format('YYYY-MM')
            this.data = await this.roleService.messageNotice(this.companyId, nowDate, this.dto.page, this.dto.size)
        } catch (e) {
            console.log(e)
        } finally {
            this.isSpinning = false
        }
        // console.log(this.data, this.data.totalCount, '消息通知')
    }

    onChange(result: Date):void {
        this.isSpinning = true
        let valDate = moment(result).format('YYYY-MM')
        this.dto.page = 1
        this.roleService.messageNotice(this.companyId, valDate, this.dto.page, this.dto.size).then(res => {
            this.data = res
            this.isSpinning = false
        }).catch(() => {
            this.isSpinning = false
        })
    }

    pageIndexHandle():void {
        this.getData()
    }
}
