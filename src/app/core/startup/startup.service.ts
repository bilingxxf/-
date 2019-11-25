import { Router } from '@angular/router'
import { Injectable, Injector, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { zip } from 'rxjs/observable/zip'
import { catchError } from 'rxjs/operators'
import { MenuService, SettingsService, TitleService } from '@delon/theme'
import { ACLService } from '@delon/acl'
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth'
import { UserService } from '../user/user.service'

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        // private userService: UserService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector) { }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get('assets/app-data.json')
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null)
                return [appData]
            })
        ).subscribe(async ([appData]) => {
    
            const user = await this.injector.get(UserService).getUser()
            this.aclService.setAbility(user.permissions.filter(Boolean).map(o => o.id))


            // application data
            const res: any = appData
            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app)
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(res.user)
            // 初始化菜单
            this.menuService.add(res.menu)
            // 设置页面标题的后缀
            this.titleService.suffix = res.app.name
        },
        () => { },
        () => {
            resolve(null)
        })
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.viaHttp(resolve, reject)
        })
    }
}
