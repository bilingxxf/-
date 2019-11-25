import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UserAllotDetailListDto } from '@core/product-demand/user-allot-detail-list-dto'
import { UserAllotDetailDto } from '@core/product-demand/user-allot-detail-dto'
import { ProductivityService } from '@core/productivity/productivity.service';

@Component({
  selector: 'app-allot-detail',
  templateUrl: './allot-detail.component.html',
  styleUrls:['./allot-detail.component.less']
})
export class AllotDetailComponent implements OnInit {
    @Input() monomerId:any

    userName:string

    lineUserDTO = new UserAllotDetailListDto()

    dataSet: any[] = [] // 列表数据

    isSpinning = false // 加载中

    isDetailSpinning = false // 加载中

    isUserDetailDlgVisible = false // 是否显示用户详情

    userDlgTitle:string =''

    userDetailData: any = {}

    userDetailListDTO = new UserAllotDetailDto()

    constructor(
        private productivityService: ProductivityService
    ) { }

    async ngOnInit() {
      this.userDetailListDTO.monomerId = this.monomerId
      this.lineUserDTO.monomerId = this.monomerId
      this.getUserList()
    }

    searchUser() {
      this.lineUserDTO.page = 1
      this.getUserList()
    }

    /**
     * 打开用户详情
     */
    openUserDetail(item) {
      this.isUserDetailDlgVisible = true;
      this.userDlgTitle = `${item.userName}-任务分配表`
      this.userDetailListDTO.userId = item.userId
      this.getuserDetailList()
    }

    /**
     * 导出excel
     */
    exportExcel(item) {
      this.userDetailListDTO.userId = item.userId
      this.productivityService.exportUserTaskAllot(this.userDetailListDTO)
      item.hasUpdate = 0
    }

    /**
     * 获取用户任务详情列表
     */
    async getuserDetailList() {
      this.isDetailSpinning = true
      this.productivityService.getUserTaskList(this.userDetailListDTO).then(data => {
        this.userDetailData = data
        this.userDetailData.data.forEach( item => {
          if(item.structure && item.structure.pieceWeight * item.needQuantity){
            item.planWeight = (item.structure.pieceWeight * item.needQuantity).toFixed(2)
            // console.log('------------------------',item.structure.pieceWeight, item.needQuantity)
          }
          
        })
        console.log(this.userDetailData)
        this.isDetailSpinning = false
      }).catch(() => {
        this.isDetailSpinning = false
      })
    }

    /**
     * 获取所有用户任务列表
     */
    async getUserList() {
      // this.lineUserDTO.userName = this.userName
      this.isSpinning = true
      this.productivityService.getUserAllotList(this.lineUserDTO).then(data => {
        this.dataSet = data
        this.isSpinning = false
      }).catch(() => {
        this.isSpinning = false
      })
    }

    showModal(): void {
      this.isUserDetailDlgVisible = true;
    }
  
    handleOk(): void {
      this.isUserDetailDlgVisible = false;
    }

    handleCancel(): void {
      this.isUserDetailDlgVisible = false;
    }

}
