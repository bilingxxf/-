import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { UploadChangeParam, UploadFile, NzNotificationService, NzMessageService } from 'ng-zorro-antd'
import { CompanyService } from '@core/company/company.service';
import { CompanySetLogoDTO } from '@core/company/company-set-logo.dto';
import { UserService } from '@core/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

    LogoList: any[] = []
    WxList: any[] = []

    constructor(
        private http: _HttpClient,
        private companyService: CompanyService,
        private userService: UserService,
        private msg: NzMessageService
    ) { }

    async ngOnInit() {
      const response = await this.userService.getCurrentUserInfo();
      const companyInfo: any = await this.companyService.f(response.department.companyId);
      if (companyInfo.companyLogo) {
        this.LogoList.push({
          id:companyInfo.companyLogo.id,
          name: companyInfo.companyLogo.fileName,
          status: 'done',
          url: `/files/${companyInfo.companyLogo.filePath}${companyInfo.companyLogo.fileName}`
        })
      }
      if (companyInfo.wxOfficialLogo) {
        this.WxList.push({
          id:companyInfo.wxOfficialLogo.id,
          name: companyInfo.wxOfficialLogo.fileName,
          status: 'done',
          url: `/files/${companyInfo.wxOfficialLogo.filePath}${companyInfo.wxOfficialLogo.fileName}`
        })
      }
      console.log(this.LogoList);
    }

    // getRequestParams(file: UploadFile) {
    //   console.log(file);
    // }

    async handleChange(e: UploadChangeParam, type) {
      console.log(e);
      if (e.file.status !== 'done') return

      const response = await this.userService.getCurrentUserInfo();
      const query = new CompanySetLogoDTO();
      query.tagType = type;
      if (type === 1) {
        query.companyLogoId = e.file.response.data;
      } else if (type === 2) {
        query.wxOfficialLogoId = e.file.response.data;
      }
      query.id = response.department.companyId
      await this.companyService.setLogo(query);
      this.msg.info('操作成功')
      // await this.userService.getCurrentUserInfo();
    }

}
