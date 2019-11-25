import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { TotalPregressQueryDto } from '@core/total-progress/total-pregress-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { TotalPregressListItem } from '../../../core/total-progress/total-pregress-list-item'
import { TotalPregressService } from '../../../core/total-progress/total-pregress.service'
import { ActivatedRoute } from '@angular/router'
import { Box } from '@shared/component/multi-color-box-list/box'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { MonomerService } from '@core/monomer/monomer.service'
import { ProductTypes } from '../../../constant/product-types.enum'
import { PlanService } from '@core/plan/plan.service'
import { Colors }  from '../../../constant/colors.enum';
import { BlockUI, NgBlockUI } from 'ng-block-ui';



@Component({
  selector: 'app-total-progress-page',
  templateUrl: './total-progress-page.component.html',
})
export class TotalProgressPageComponent implements OnInit {
    // Wires up BlockUI instance
    @BlockUI() blockUI: NgBlockUI;

    projectId: number

    active = 1

    types = ProductTypes

    dto = new TotalPregressQueryDto()

    data = new PagingData<TotalPregressListItem>()

    total: any[] = []
    total_enclosure: any[] = []
    pageMonomers: any[] = []

    _currentArea: any
    set currentArea(val) {
        this._currentArea = val;
        this.filter(this.activeTab);
    }

    get currentArea() {
        return this._currentArea;
    }
    
    _currentMonomers: any
    set currentMonomers(val) {
        // console.log('set currentMonomers',val.monomer.id);
        this._currentMonomers = val;
        this.currentArea = val.areas[0];
        this.getAll();
    } 

    get currentMonomers() {
        // console.log('get currentMonomers',this._currentMonomers.monomer.id);
        return this._currentMonomers
    }
    
    currentTab: any

    boxs: Box[] = []

    _activeTab = 1

    set activeTab(val) {
        this._activeTab = val;
        console.log('activeTab,', val);
        this.filter(val)
    }

    get activeTab() {
        return this._activeTab;
    }


    monomers: {name: string, url: SafeResourceUrl}[] = []

    constructor(
        private totalPregressService: TotalPregressService,
        private activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private planService: PlanService,
        private monomerService: MonomerService
    ) { }

    onSearch() {}

    selectChange() {
        this.currentArea = this.currentMonomers.areas[0];
    }

    async ngOnInit() {
        this.activatedRoute.params.subscribe(({ id }) => this.dto.projectId = this.projectId = id)
        const monomers = await this.monomerService.getByProjectId(this.projectId) // 获取项目所有单体，例："钢结构车道和造型"
        this.monomers = monomers.filter(o => o.modelProjectId).map(o => ({  // 根据过滤有modelProjectId单元结构
            name: o.name,
            url: this.sanitizer.bypassSecurityTrustResourceUrl(`engine/Model/index.do?id=${o.modelProjectId}`)
        }));
        this.currentTab = this.monomers[0]; // 设置当前tab为第一个单体
        this.pageMonomers = await Promise.all(monomers.map(async monomer => {// 
            const areas = await this.planService.getMonomerAreasByMonomerId(monomer.id)
            return { monomer, areas }
        }))
        this.currentMonomers = this.pageMonomers[0]; // 当前单体，例："钢结构车道和造型"
        this.currentArea = this.currentMonomers.areas[0]; // 当前区域，例：A段（景观造型）
    }

    async getAll() {
        if(this.projectId && this.currentArea && this.currentArea.id){
            this.total = await this.totalPregressService.getAll(this.projectId, this.currentArea.id);
            this.total_enclosure =  await this.totalPregressService.getAll(this.projectId, this.currentMonomers.monomer.id, 2);
        }
    }
    
    switchTab(val: number) {
        this.active = val;
        this.filter(this.activeTab);
    }

    filter(val) {
        this.toggleBlocking('数据整理中，请稍后')
        this.getAll().then(() =>{
            let total = this.active === 1 ? this.total : this.total_enclosure;
            let _key = ''
            switch(val) {
                case 3:
                    _key = 'finishedRecordQuantity';
                    break;
                case 4:
                    _key = 'outStockQuantity';
                    break;
                case 5:
                    _key = 'setupQuantity';
                    break;
                default:
                    _key = 'setupQuantity';
            }
            this.boxs = total.map(o => {
                const box = new Box()

                box.content = this.active === 1 ? `${o.name} ${o.serialNo} ${o[_key]}/${o.totalQuantity}` : `${o.name} ${o.modelNum} ${o.useArea} ${o.inStockQuantity}/${o.totalQuantity}`

                box.areas = [{
                    color: Colors.SUCCESS,
                    percent: 1
                }]
                if(o[_key] > 0 && o[_key] < o.totalQuantity){
                    box.areas = [{
                        color: Colors.WARN,
                        percent: 1
                    }]
                }
                if(o[_key] == 0) {
                    box.areas = [{
                        color: Colors.GRAY,
                        percent: 1
                    }]
                }
                //Colors.GRAY
                return box
            })
            // 关闭loading组件
            this.blockUI.stop();
        }).catch(e => {
            this.blockUI.stop();
        })
        
    }

    async getData() {
        this.data = await this.totalPregressService.list(this.dto)
    }

    /**
     * 弹出loading组件
     * @param message loading下方的提示信息
     */
    toggleBlocking(message?: string) {
        this.blockUI.start(message);
    }

}
