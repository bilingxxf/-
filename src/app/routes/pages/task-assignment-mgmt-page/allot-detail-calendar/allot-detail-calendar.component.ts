import { Component, OnInit, Input, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import momentPlugin from '@fullcalendar/moment';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ProductivityService } from '@core/productivity/productivity.service';
import { UserAllotDetailDto } from '@core/product-demand/user-allot-detail-dto'
import { UserAllotDetailListDto } from '@core/product-demand/user-allot-detail-list-dto'
import * as moment from 'moment'

@Component({
  selector: 'app-allot-detail-calendar',
  templateUrl: './allot-detail-calendar.component.html',
  styleUrls:['./allot-detail-calendar.component.less']
})
export class AllotDetailCalendarComponent implements OnInit {
    @Input() monomerId:any

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;

    lineUserDTO = new UserAllotDetailListDto()

    calendarPlugins = [dayGridPlugin, listPlugin, momentPlugin]; // 插件

    eventSources = []

    lastStartDate = ''

    lastEndDate = ''

    isSpinning: Boolean = false

    // 详情
    isDetailSpinning = false // 加载中

    isUserDetailDlgVisible = false // 是否显示用户详情

    userDlgTitle:string =''

    userDetailData: any = {}

    userDetailListDTO = new UserAllotDetailDto()

    summary:any = {}

    constructor(
      private productivityService: ProductivityService
    ) { }

    ngOnInit() {
      this.lineUserDTO.monomerId = this.monomerId
      this.userDetailListDTO.monomerId = this.monomerId
    }

    /**
     * 打开用户详情
     */
    openUserDetail(item) {
      if(!item.userId || !item.createDate) {
        return
      }
      this.isUserDetailDlgVisible = true;
      this.userDlgTitle = `任务分配表-${item.userName}（${item.createDate}）`
      this.userDetailListDTO.userId = item.userId
      this.userDetailListDTO.createDate = item.createDate
      this.userDetailListDTO.page = 1
      this.getUserDetailList()
      this.getUserCumulative()
    }

    /**
     * 获取用户汇总信息
     *
     */
    async getUserCumulative() {
      let data = await this.productivityService.fetchUserCumulativeData(this.userDetailListDTO)
      this.summary = data
    }

    /**
     * 导出excel
     */
    exportExcel() {
      // this.userDetailListDTO.userId = this.currentRow.userId || ''
      // this.userDetailListDTO.createDate = this.currentRow.createDate || ''
      this.productivityService.exportUserTaskAllot(this.userDetailListDTO)
    }

    /**
     * 获取用户任务详情列表
     */
    async getUserDetailList() {
      this.isDetailSpinning = true
      this.userDetailData = []
      this.productivityService.getUserTaskList(this.userDetailListDTO).then(data => {
        this.userDetailData = data
        this.userDetailData.data.forEach( item => {
          if(item.structure && item.structure.pieceWeight * item.needQuantity){
            item.planWeight = (item.structure.pieceWeight * item.needQuantity).toFixed(2)
          }
        })
        this.isDetailSpinning = false
        this.fetchList()
      }).catch(() => {
        this.isDetailSpinning = false
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

    eventClick (info) {
      let data = info && info.event && info.event.extendedProps
      if(data){
        this.openUserDetail(data)
      }
    }

    datesRender(info) {
      console.log(info)
      if(info){
        this.lastStartDate = moment(info.view.activeStart).format('YYYY-MM-DD')
        this.lastEndDate = moment(info.view.activeEnd).format('YYYY-MM-DD')
      }else{
        this.lastStartDate = ''
        this.lastEndDate = ''
      }
      this.fetchList()
    }

    async fetchList() {
      if(this.isSpinning) return
      this.lineUserDTO.startDate = this.lastStartDate
      this.lineUserDTO.endDate = this.lastEndDate
      let data = []
      let eventSources = []
      try {
        this.isSpinning = true
        data = await this.productivityService.fetchAllotListByDate(this.lineUserDTO)
        let changedData = [] // 改变的数据
        let unchangedData = [] // 未改变的数据
        let changeDateData = [] // 改变数据的日期数据
        let unchangedDateData = [] // 未改变数据的日期数据
        let allDate = [] // 所有日期
        let changedDate = [] // 改变数据的日期
        let unchangedDate = [] // 未改变数据的日期
        data.forEach( l => {
          let _data = {
            userId: l.userId,
            title: `${l.name} / 数量: ${l.number} / 重量: ${l.weight}kg`,
            start: moment(l.startDate).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(l.endDate).format('YYYY-MM-DD HH:mm:ss'),
            createDate: l.createDate,
            userName: l.name
          }
          // 是否改变 hasUpdate > 0 为改变
          if(l.hasUpdate > 0) {
            changedData.push(_data)
            changedDate.push(_data.createDate)
          }else{
            unchangedData.push(_data)
          }
          allDate.push(_data.createDate)
        })
        allDate =  Array.from(new Set(allDate))
        changedDate =  Array.from(new Set(changedDate))
        unchangedDate = allDate.filter(v => changedDate.indexOf(v) == -1)
        
        changedDate.forEach(v => {
          changeDateData.push({
            date: v,
            rendering: 'background'
          })
        })
        
        unchangedDate.forEach(v => {
          unchangedDateData.push({
            date: v,
            rendering: 'background'
          })
        })
        // 设置数据源
        eventSources = [
          {
            events: changedData,
            color: 'red',
          },
          {
            events: unchangedData,
          },
          {
            events: changeDateData,
            backgroundColor: '#f46e65'
          },
          {
            events: unchangedDateData,
            backgroundColor: '#3dbd7d'
          }
        ]
        console.log(eventSources)
      } catch (error) {
        eventSources = []
        console.log(error)
      } finally {
        this.eventSources =  eventSources
        this.isSpinning = false
      }
      
    }

}
