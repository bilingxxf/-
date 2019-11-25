import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { environment } from '@env/environment'
import { LayoutDefaultComponent } from '../layout/default/default.component'
import { LayoutPassportComponent } from '../layout/passport/passport.component'
import { Exception403Component } from './exception/403.component'
import { Exception404Component } from './exception/404.component'
import { Exception500Component } from './exception/500.component'

const routes: Routes = [
    {
        path: '',
        component: LayoutDefaultComponent,
        children: [
            { path: '', redirectTo: 'project-mgmt', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: './pages/dashboard-page/dashboard-page.module#DashboardPageModule',
                data: { title: '仪表盘' }
            },
            {
                path: 'approval-mgmt',
                loadChildren: './pages/approval-mgmt-page/approval-mgmt-page.module#ApprovalMgmtPageModule',
                data: {
                    title: '我的审批'
                }
            },
            {
                path: 'approval-history',
                loadChildren: './pages/approval-history/approval-history.module#ApprovalHistoryModule',
                data: {
                    title: '历史记录'
                }
            },
            {
                path: 'common-use-form-mgmt',
                loadChildren: './pages/common-use-form-mgmt-page/common-use-form-mgmt-page.module#CommonUseFormMgmtPageModule',
                data: {
                    title: '常用表单'
                }
            },
            {
                path: 'production-line-mgmt',
                loadChildren: './pages/production-line-mgmt-page/production-line-mgmt-page.module#ProductionLineMgmtPageModule',
                data: {
                    title: '流程管理'
                }
            },
            // {
            //     path: 'task-assignment-mgmt',
            //     loadChildren: './pages/task-assignment-mgmt-page/task-assignment-mgmt-page.module#TaskAssignmentMgmtPageModule',
            //     data: {
            //         title: '任务分派'
            //     }
            // },
            {
                path: 'project-mgmt',
                loadChildren: './pages/project-mgmt-page/project-mgmt-page.module#ProjectMgmtPageModule',
                data: {
                    title: '项目信息'
                }
            },
            {
                path: 'project-detail/:id',
                loadChildren: './pages/project-detail-page/project-detail-page.module#ProjectDetailPageModule',
                data: {
                    title: '项目详情'
                }
            },
            // {
            //     path: 'project-exportpage-detail/:id',
            //     loadChildren: './pages/project-detail-page/project-detail-page.module#ProjectDetailPageModule',
            //     data: {
            //         title: '报表详情'
            //     }
            // },
            {
                path: 'project-c',
                loadChildren: './pages/project-c-page/project-c-page.module#ProjectCPageModule',
                data: {
                    title: '新建项目'
                }
            },
            //编辑生产详情线框
            // {
            //     path: 'detail-edit',
            //     component: DetailEdit,
            //     data: {
            //         title: '编辑生产线详情'
            //     }
            // },
            {
                path: 'implement-plan-mgmt',
                loadChildren: './pages/implement-plan-mgmt-page/implement-plan-mgmt-page.module#ImplementPlanMgmtPageModule',
                data: {
                    title: '实施计划'
                }
            },
            {
                path: 'product-subcontract',
                loadChildren: './pages/product-subcontract-mgmt-page/product-subcontract-mgmt-page.module#ProductSubcontractMgmtPageModule',
                data: {
                    title: '产品分包'
                }
            },
            {
                path: 'product-subcontract-summary/:id',
                loadChildren: './pages/product-subcontract-summary-page/product-subcontract-summary-page.module#ProductSubcontractSummaryPageModule',
                data: {
                    title: '分包汇总清单'
                }
            },
            {
                path: 'product-subcontract-c/:id',
                loadChildren: './pages/product-subcontract-c-page/product-subcontract-c-page.module#ProductSubcontractCPageModule',
                data: {
                    title: '产品分包'
                }
            },
            // {
            //     path: 'print-label/:id',
            //     component: PrintLabelPageComponent,
            //     data: {
            //         title: '打印标签'
            //     }
            // },
            {
                path: 'implement-plan-create/:id',
                loadChildren: './pages/implement-plan-mgmt-page/implement-plan-create-page/implement-plan-create-page.module#ImplementPlanCreatePageModule',
                data: {
                    title: '制定实施计划'
                }
            },
            {
                path: 'implement-plan-detail/:id',
                loadChildren: './pages/implement-plan-detail-page/implement-plan-detail-page.module#ImplementPlanDetailPageModule',
                data: {
                    title: '实施计划详情'
                }
            },
            // {
            //     path: 'implement-plan-detail/:id',
            //     component: ImplementPlanDetailPageComponent,
            //     data: {
            //         title: '实施计划详情'
            //     }
            // },
            // {
            //     path: 'implement-plan-detail/:id',
            //     component: Modil,
            //     data: {
            //         title: '实施计划详情'
            //     }
            // },
            {
                path: 'inventory-import/:id',
                loadChildren: './pages/inventory-import-page/inventory-import-page.module#InventoryImportPageModule',
                data: {
                    title: '清单导入'
                }
            },
            {
                path: 'business-entry/:id',
                loadChildren: './pages/business-entry-page/business-entry-page.module#BusinessEntryPageModule',
                data: {
                    title: '商务录入'
                }
            },
            // 没有该路由
            // {
            //     path: 'quality-board/:id',
            //     component: QualityBoardPageComponent,
            //     data: {
            //         title: '品质看板'
            //     }
            // },
            // {
            //     path: 'warehousing-mgmt/:id',
            //     component: WarehousingMgmtPageComponent,
            //     data: {
            //         title: '入库管理'
            //     }
            // },
            {
                path: 'warehousing-out-mgmt/:id',
                loadChildren: './pages/warehousing-out-mgmt-page/warehousing-out-mgmt-page.module#WarehousingOutMgmtPageModule',
                data: {
                    title: '出库管理'
                }
            },
            {
                path: 'cargo-list-mgmt/:id',
                loadChildren: './pages/cargo-list-mgmt-page/cargo-list-mgmt-page.module#CargoListMgmtPageModule',
                data: {
                    title: '发货清单'
                }
            },
            {
                path: 'enterprise-mgmt',
                loadChildren: './pages/enterprise-mgmt-page/enterprise-mgmt-page.module#EnterpriseMgmtPageModule',
                data: {
                    title: '企业管理'
                }
            },
            {
                path: 'enterprise-c',
                loadChildren: './pages/enterprise-c-page/enterprise-c-page.module#EnterpriseCPageModule',
                data: {
                    title: '添加企业'
                }
            },
            {
                path: 'role-mgmt',
                loadChildren: './pages/role-mgmt-page/role-mgmt-page.module#RoleMgmtPageModule',
                data: {
                    title: '角色管理'
                }
            },
            {
                path: 'user-mgmt',
                loadChildren: './pages/user-mgmt-page/user-mgmt-page.module#UserMgmtPageModule',
                data: {
                    title: '用户管理'
                }
            },
            {
                path: 'department-mgmt',
                loadChildren: './pages/department-mgmt-page/department-mgmt-page.module#DepartmentMgmtPageModule',
                data: {
                    title: '部门管理'
                },
            },
            // 不是路由页面
            // {
            //     path: 'construction-log-mgmt/:id',
            //     loadChildren: './pages/construction-log-mgmt-page/construction-log-mgmt-page.module#ConstructionLogMgmtPageModule',
            //     data: {
            //         title: '施工日志管理'
            //     }
            // },
            // 不是路由页面
            // {
            //     path: 'image-progress/:id',
            //     component: ImageProgressPageComponent,
            //     data: {
            //         title: '形象进度'
            //     }
            // },
            // 不是路由页面
            // {
            //     path: 'problem-feedback-mgmt/:id',
            //     component: ProblemFeedbackMgmtPageComponent,
            //     data: {
            //         title: '质量反馈'
            //     }
            // },
            // {
            //     path: 'material-demand/:id',
            //     loadChildren: './pages/material-demand-page/material-demand-page.module#MaterialDemandPageModule',
            //     data: {
            //         title: '需求计划'
            //     }
            // },
            {
                path: 'product-demand-plan-summary/:id',
                loadChildren: './pages/product-demand-plan-summary-page/product-demand-plan-summary-page.module#ProductDemandPlanSummaryPageModule',
                data: {
                    title: '材料需求计划汇总清单'
                }
            },
            // {
            //     path: 'fix-plan-summary/:id',
            //     loadChildren: './pages/fix-plan-summary-page/fix-plan-summary-page.module#FixPlanSummaryPageModule',
            //     data: {
            //         title: '安装计划汇总清单'
            //     }
            // },
            {
                path: 'total-progress/:id',
                loadChildren: './pages/total-progress-page/total-progress-page.module#TotalProgressPageModule',
                data: {
                    title: '总进度看板'
                }
            },
            {
                path: 'warehousing-static/:id',
                loadChildren: './pages/warehousing-static-page/warehousing-static-page.module#WarehousingStaticPageModule',
                data: {
                    title: '收货统计'
                }
            },
            // 没有该路由模块
            // {
            //     path: 'fix-static/:id',
            //     loadChildren: './pages/fix-static-page/fix-static-page.module#FixStaticPageModule',
            //     data: {
            //         title: '安装统计'
            //     }
            // },
            // 没有路由
            // {
            //     path: 'inspection-mgmt/:id',
            //     loadChildren: './pages/inspection-mgmt-page/inspection-mgmt-page.module#InspectionMgmtPageModule',
            //     data: {
            //         title: '巡检报告'
            //     }
            // },
            {
                path: 'contact-letter-mgmt',
                loadChildren: './pages/contact-letter-mgmt-page/contact-letter-mgmt-page.module#ContactLetterMgmtPageModule',
                data: {
                    title: '联系函'
                }
            },
            // 没有该路由模块
            // {
            //     path: 'fix-plan/:id',
            //     component: FixPlanPageComponent,
            //     data: {
            //         title: '安装计划'
            //     }
            // },
            {
                path: 'construction-material/:id',
                loadChildren: './pages/construction-material-page/construction-material-page.module#ConstructionMaterialPageModule',
                data: {
                    title: '施工资料'
                }
            },
            {
                path: 'receipt-and-invoice-mgmt/:id',
                loadChildren: './pages/receipt-and-invoice-mgmt-page/receipt-and-invoice-mgmt-page.module#ReceiptAndInvoiceMgmtPageModule',
                data: {
                    title: '收款及开票管理'
                }
            },
            {
                path: 'production-mgmt/:id',
                loadChildren: './pages/production-mgmt-page/production-mgmt-page.module#ProductionMgmtPageModule',
                data: {
                    title: '生产管理'
                }
            },
            {
                path: 'quality-mgmt/:id',
                loadChildren: './pages/quality-mgmt-page/quality-mgmt-page.module#QualityMgmtPageModule',
                data: {
                    title: '品质管理'
                }
            },
            {
                path: 'inbound-and-outbound-mgmt/:id',
                loadChildren: './pages/inbound-and-outbound-mgmt-page/inbound-and-outbound-mgmt-page.module#InboundAndOutboundMgmtPageModule',
                data: {
                    title: '出入库管理'
                }
            },
            {
                path: 'finished-product-receipt-and-fix-static/:id',
                loadChildren: './pages/finished-product-receipt-and-fix-static-page/finished-product-receipt-and-fix-static-page.module#FinishedProductReceiptAndFixStaticPageModule',
                data: {
                    title: '收安统计'
                }
            },
            {
                path: 'project-plan/:id',
                loadChildren: './pages/project-plan-page/project-plan-page.module#ProjectPlanPageModule',
                data: {
                    title: '项目计划'
                }
            },
            {
                path: 'inspections-mgmt/:id',
                loadChildren: './pages/inspections-mgmt-page/inspections-mgmt-page.module#InspectionsMgmtPageModule',
                data: {
                    title: '巡检管理'
                }
            },
            {
                path: 'contact-letter-detail/:id',
                loadChildren: './pages/contact-letter-detail-page/contact-letter-detail-page.module#ContactLetterDetailPageModule',
                data: {
                    title: '联系函表单详情'
                }
            },
            {
                path: 'kpi/:id',
                loadChildren: './pages/kpi-page/kpi-page.module#KpiPageModule',
                data: {
                    title: '统计数据'
                }
            },
            {
                path: 'permissions-management',
                loadChildren: './pages/permission-management-page/permission-management-page.module#PermissionManagementPageModule',
                data: {
                    title: '权限配置'
                }
            },
            {
                path: 'warehousing-deily-detail/:projectId/:id',
                loadChildren: './pages/warehousing-daily-detail/warehousing-daily-detail.module#WarehousingDailyDetailModule',
                data: {
                    title: '出入日详情'
                }
            },
            {
                path: 'finished-daily-detail/:projectId/:id',
                loadChildren: './pages/finished-daily-detail/finished-daily-detail.module#FinishedDailyDetailModule',
                data: {
                    title: '收货安装详情'
                }
            },
            {
                path: 'project-plan-daily/:id',
                loadChildren: './pages/project-plan-daily-page/project-plan-daily-page.module#ProjectPlanDailyPageModule',
                data: {
                    title: '项目计划日详情'
                }
            },
            {
                path: 'product-line-detail',
                loadChildren: './pages/production-line-mgmt-page/production-line-detail/production-line-detail.module#ProductionLineDetailModule',
                data: {
                    title: '生产线详情'
                }
            },
            {
                path: 'product-contain-detail',
                loadChildren: './pages/production-line-mgmt-page/production-contain-detail/production-contain-detail.module#ProductionContainLinDetailModule',
                data: {
                    title: '围护生产线详情'
                }
            },
            {
                path: 'product-board-detail/:id',
                loadChildren: './pages/production-mgmt-page/productivity-board-detail/productivity-board-detail.module#ProductivityBoardDetailModule',
                data: {
                    title: '产量管理报表'
                }
            },

            // //生产线详情
            // {
            //     path: 'production-line-detail/:id',
            //     component: ProductionLineDetail,
            //     data: {
            //         title: '生产线详情'
            //     }
            // },
            
            // //查看新增任务列表
            // {
            //     path: 'task-detail',
            //     component: TaskDetail,
            //     data: {
            //         title: '新增任务列表'
            //     }
            // },
            {
                path: 'profile',
                loadChildren: './pages/profile/profile.module#ProfileModule',
                data: {
                    title: '企业信息'
                }
            },

            // {
            //     path: 'supplier-management',
            //     component: SupplierManagementComponent,
            //     data: {
            //         title: '供应商管理'
            //     }
            // },
            // {
            //     path: 'transaction-record/:id',
            //     component: TransactionRecordComponent,
            //     data: {
            //         title: '交易记录'
            //     }
            // },
            // {
            //     path: 'materials-inbound',
            //     component: MaterialsInboundComponent,
            //     data: {
            //         title: '入库列表'
            //     }
            // },
            // {
            //     path: 'materials-inbound-detail',
            //     component: MaterialsInboundDetailComponent,
            //     data: {
            //         title: '入库详情'
            //     }
            // },
            // {
            //     path: 'materials-return',
            //     component: MaterialsReturnComponent,
            //     data: {
            //         title: '物料退库'
            //     }
            // },
            // {
            //     path: 'materials-outbound',
            //     component: MaterialsOutboundComponent,
            //     data: {
            //         title: '物料出库'
            //     }
            // },
            // {
            //     path: 'materials-outbound-detail',
            //     component: MaterialsOutboundDetailComponent,
            //     data: {
            //         title: '物料出库详情'
            //     }
            // },
            // {
            //     path: 'materials-type',
            //     component: MaterialsTypeComponent,
            //     data: {
            //         title: '物料类型'
            //     }
            // },
            // {
            //     path: 'materials-category-list',
            //     component: MaterialsCategoryListComponent,
            //     data: {
            //         title: '物料类型'
            //     }
            // }, 
            // {
            //     path: 'materials-data',
            //     component: MaterialsDataComponent,
            //     data: {
            //         title: '物料池'
            //     }
            // },
            // {
            //     path: 'materials-data-detail',
            //     component: MaterialsDataDetailComponent,
            //     data: {
            //         title: '物料详情'
            //     }
            // },
            // {
            //     path: 'materials-add-inbound',
            //     component: MaterialsAddInboundComponent,
            //     data: {
            //         title: '新增入库单'
            //     }
            // }
        ]
    },
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', loadChildren: './passport/login/login.module#LoginModule' },
            { path: 'register', loadChildren: './passport/register/register.module#RegisterModule' },
            { path: 'register-result', loadChildren: './passport/register-result/register-result.module#RegisterResultModule' },
            { path: 'forget-password', loadChildren: './passport/forget-password/forget-password.module#ForgetPasswordModule' }
        ]
    },
    // 单页不包裹Layout
    { path: 'callback/:type', loadChildren: './callback/callback.module#CallbackModule' },
    { path: '403', component: Exception403Component },
    { path: '404', component: Exception404Component },
    { path: '500', component: Exception500Component },
    { path: '**', redirectTo: 'passport/login' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule]
})
export class RouteRoutingModule {}
