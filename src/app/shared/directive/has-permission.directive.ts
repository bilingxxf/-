import { Directive, ElementRef, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core'
import { UserService } from '@core/user/user.service'
import { PermissionService } from '../../core/permission/permission.service'

@Directive({
    selector: '[hasPermission]'
})
export class HasPermissionDirective implements OnInit {

    @Input('hasPermission') permissionId: number

    constructor(
        private element: ElementRef,
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private permissionService: PermissionService
    ) { }

    async ngOnInit() {
        if (await this.permissionService.hasPermission(this.permissionId)) {
            this.viewContainer.createEmbeddedView(this.templateRef)
        }
    }
}
