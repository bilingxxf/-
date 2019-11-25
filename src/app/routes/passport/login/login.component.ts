import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd'
import { UserLoginDto } from '@core/user/user-login-dto'
import { UserService } from '@core/user/user.service'

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ]
})
export class UserLoginComponent {

    loading = false

    checked = true

    dto = new UserLoginDto()

    constructor(
        public msg: NzMessageService,
        private router: Router,
        private userService: UserService
    ) { }

    async login() {
        this.loading = true
        try { 
            console.log(this.dto)
            await this.userService.login(this.dto)
            this.router.navigate(['/project-mgmt'])
        } catch (e) {
            this.loading = false
            this.msg.error(e.error.message)
        }
    }
}
