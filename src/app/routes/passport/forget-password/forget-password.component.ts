import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { UserForgetPasswordDTO } from '@core/user/user-forget-password-dto'
import { UserService } from '@core/user/user.service'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: [ '../login/login.component.less' ]

})
export class ForgetPasswordComponent{

  loading = false

  checked = true

  dto = new UserForgetPasswordDTO()
  second = 0;
  timer = null;

  constructor(
      public msg: NzMessageService,
      private router: Router,
      private userService: UserService
  ) { }
  async submit() {
    this.loading = true;
    try {
      await this.userService.reset(this.dto);
      this.router.navigate(['/passport/login'])
    } catch (e) {
      this.loading = false
      this.msg.error(e.error.message)
    }
  }

  async send(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.dto.phone) {
      this.msg.error('请输入手机号');
      return
    }
    await this.userService.send(this.dto.phone);
    this.second = 60;
    this.timer = setInterval(() => {
      if (this.second > 0) {
        this.second = this.second - 1;
      } else {
        clearInterval(this.timer)
      }
    }, 1000)

  }

  async login() {
      // this.loading = true
      // try { 
      //     await this.userService.login(this.dto)
      //     this.router.navigate(['/project-mgmt'])
      // } catch (e) {
      //     this.loading = false
      //     this.msg.error(e.error.message)
      // }
  }

}
