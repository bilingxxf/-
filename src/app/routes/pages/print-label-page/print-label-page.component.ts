import { Component, OnInit, Input } from '@angular/core'
import { Monomer } from '@core/monomer/monomer'
import { AreaDivision } from '@core/plan/area-division'
import { ListQueryWithCompanyId } from '@core/common-entity/list-query-with-company-id'
import { Role } from '../../../core/role/role'
import { RoleService } from '../../../core/role/role.service'
import { PagingData } from '@core/common-entity/paging-data'
import { UserService } from '@core/user/user.service'


@Component({
  selector: 'app-print-label-page',
  templateUrl: './print-label-page.component.html',
})
export class PrintLabelPageComponent implements OnInit {

    projectTotalPrice: number;
    currentArea: any;
    currentLine: any = -1;
    active = 1;

    @Input() projectId: number

    @Input() monomer:Monomer

    _areas: AreaDivision[]
    @Input()
    set areas(val) {
        if(val) {
            this._areas = val;
            this.currentArea = this._areas[0];
        } else {
            this._areas = []
            this.currentArea = null
        }
    }
    get areas() {
        return this._areas;
    }

    _productionLines: any
    @Input()
    set productionLines(val) {
        this._productionLines = val;
        this.currentLine = this._productionLines[0]
    }
    get productionLines() {
        return this._productionLines;
    }

    updatedRecord:any
    deleteRecord:any
    selectedIndex:number
    leftSelectedIndex:number

    leftTabs:any = [
        { name: '结构', value: 'structure', index: 0},
        { name: '围护', value: 'enclosure', index: 1},
        { name: '辅材', value: 'material', index: 2}
    ]

    dto = new ListQueryWithCompanyId()

    data = new PagingData<Role>()

    constructor(
        private roleService: RoleService,
        public userService: UserService
    ) {}

    async ngOnInit() {
        this.getProductLineInfo()
        this.hasGetArea()
    }

    async hasGetArea() {
        let timer = null
        timer = setInterval(() => {
            // if(this.areas && this.areas.length > 0){
            //     this.selectedIndex = 2
            //     clearInterval(timer)
            // }
            if(this.areas && this.areas.length > 0){
                setTimeout(() => {
                    // TODO: 暂时写成两个对象，以防修改
                    // FIXME: FIXME
                    this.updatedRecord = {
                        areaName: '修改记录',
                        monomerId: this.monomer.id,
                        type: 0
                    }
                    this.deleteRecord = {
                        areaName: '删除记录',
                        monomerId: this.monomer.id,
                        type: 1
                    }
                }, 1000);
            }
        }, 500);
    }

    /**
     * 获取所有生产线人员
     */
    async getProductLineInfo() {
        const productLineEmployees = await this.roleService.fetchProductLineInfo()
        console.log('this.productLineEmployees-----------------', productLineEmployees)
        let lineEmployees = [];
        productLineEmployees && productLineEmployees.forEach(line => {
          line && line.userList && line.userList.forEach(employ => {
            if(employ && employ.id) { // 筛选出所有生产线人员
              employ.userLineName = line.name + '-' + employ.userName
              lineEmployees.push(employ)
            }
          });
        })
        this.productionLines = lineEmployees
        console.log('this.lineEmployees-----------------', lineEmployees)
      }

    /**
     * 获取项目总价
     */
    async getProjectTotalPrice() {
        // this.projectTotalPrice = await this.projectService.getProjectTotalPrice(this.projectId)
    }
}
