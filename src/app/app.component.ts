import { Component, HostBinding, OnInit } from '@angular/core'
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'
import { ThemesService, SettingsService, TitleService, MenuService } from '@delon/theme'
import { filter } from 'rxjs/operators'
import { getProjectMenus, getCommonMenus } from './constant/menus.constant'
import { UserService } from '@core/user/user.service';
import { PermissionService } from '@core/permission/permission.service';
import { RoleService } from '@core/role/role.service'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {

  private projectId: number

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed }

  constructor(
    private theme: ThemesService,
    private settings: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private titleSrv: TitleService) {
  }

  async ngOnInit() {
    let CommonMenus = getCommonMenus();
    let ProjectMenus = getProjectMenus();
    this.userService.user.filter(user => !!user.id).subscribe(async user => {
      CommonMenus = getCommonMenus();
      ProjectMenus = getProjectMenus();
      let response = await this.roleService.getPermissionGroupByRoleId(user.role.id);
      const PermissionModule = [];
      for (let name in response) {
        PermissionModule.push(name);
        if (name === '计划管理') {
          const items = response[name];
          let isView, isEdit;
          for (let i = 0; i < items.length; i ++) {
            const typeList = items[i].typeList;
            if (typeList.length === 2) {
              isView = true;
              isEdit = true;
              break;
            }
            if (typeList.indexOf(1) > -1) {
              isEdit = true;
              if (isEdit && isView) break 
            }
            if (typeList.indexOf(2) > -1) {
              isView = true;
              if (isEdit && isView) break
            }
          }
          if (isView) {
            PermissionModule.push('实施计划详情')
          }
          if (isEdit) {
            PermissionModule.push('制定实施计划')
          }
        }
      }
      ProjectMenus[0].children = ProjectMenus[0].children.filter(val => {
        if (!val.guard) return val
        // FIXME: 为什么要先过滤子节点
        if (val.children) {
          val.children = val.children.filter(child => {
            return PermissionModule.findIndex(name => {
              return name === child.text
            })
          })
        }
        if (PermissionModule.findIndex((name) => {
          return name === val.text
        }) > -1) {
          return val
        }
      })

      // 10: 超级管理员 11：公司
      if (+user.role.id !== 10) {
        const index = ProjectMenus[0].children.findIndex((val) => {
          return val.text === '企业管理'
        })
        if (index > -1) {
          ProjectMenus[0].children.splice(index, 1)
        }
      }
      if (+user.role.id !== 11) {
        const index = ProjectMenus[0].children.findIndex(val => val.text === '配置管理');
        if (index > -1) {
          ProjectMenus[0].children.splice(index, 1)
        }
      }
      if (+user.role.id !== 10) {
        const index = CommonMenus[0].children.findIndex((val) => {
          return val.text === '企业管理'
        })
        if (index > -1) {
          CommonMenus[0].children.splice(index, 1)
        }
      }
      if (+user.role.id !== 11) {
        const index = CommonMenus[0].children.findIndex(val => val.text === '配置管理');
        if (index > -1) {
          CommonMenus[0].children.splice(index, 1)
        }
      }
      this.menuService.clear();
      if (this.projectId) {
        this.menuService.add(ProjectMenus)
      } else {
        this.menuService.add(CommonMenus);
      }

    })
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => this.titleSrv.setTitle())

    this.router.events
      .filter(e => e instanceof NavigationStart)
      .subscribe((e: any) => {
        let url: string = e.url
        if (url.includes(':projectId')) {
          url = url.replace(/:projectId/, '')
          this.router.navigate([url, this.projectId])
        }
      })

    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .map(() => this.route)
      .map(route => {
        while (route.firstChild) route = route.firstChild
        return route
      })
      .mergeMap(route => route.params)
      .subscribe(data => {
        const projectId = +data.id
        if (!this.projectId && projectId) {
          this.menuService.clear()
          this.menuService.add(ProjectMenus)
          this.projectId = projectId
          return
        }

        if (!this.projectId && !projectId) {
          return
        }

        if (this.projectId && projectId) {
          this.projectId = projectId
          return
        }

        if (this.projectId && !projectId) {
          this.projectId = projectId
          this.menuService.clear()
          this.menuService.add(CommonMenus)
          return
        }
      })

  }
}
