import { Component, OnInit, ViewChild } from '@angular/core'
// import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc'
import { Paginate } from '../../../core/common-entity/paginateCom'
import { UserService } from '@core/user/user.service'

@Component({
  selector: 'app-enterprise-mgmt-page',
  templateUrl: './enterprise-mgmt-page.component.html',
})
export class EnterpriseMgmtPageComponent implements OnInit {

    // url = `/api/companies`

    dto = new Paginate()

    // columns: SimpleTableColumn[] = [
    //     {
    //         title: '公司全称',
    //         index: 'name'
    //     },
    //     {
    //         title: '公司简称',
    //         index: 'shortName'
    //     },
    //     {
    //         title: '创建日期',
    //         type: 'date',
    //         index: 'createTime'
    //     }
    // ]

    companyList = []

    // @ViewChild('st') st: SimpleTableComponent

    constructor(
        public userService: UserService
    ) { }

    async ngOnInit() {
        let callback = await this.userService.companyList(this.dto)
        this.companyList = callback.data
        console.log('reqHeader---------------',this.companyList)
    }
    

}
