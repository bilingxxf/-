import * as _ from 'lodash'

export function getCommonMenus(): any[] {
  return [
    {
      'text': '',
      'group': true,
      'children': [
        {
          'text': '工作台',
          'icon': 'fa fa-desktop',
          'group': true,
          'children': [
            // {
            //   'text': 'KPI 总览',
            //   'link': '/dashboard',
            //   'reuse': false
            // },
            {
              'text': '短信配置',
              'link': '/approval-history',
              'reuse': false
            },
            {
              'text': '消息通知',
              'link': '/common-use-form-mgmt',
              'reuse': false
            }
          ]
        },
        // {
        //   'text': '公告',
        //   'link': '/sms-send',
        //   'icon': 'fa fa-bullhorn',
        //   'reuse': false
        // },
        {
          'text': '我的项目',
          'link': '/project-mgmt',
          'icon': 'fa fa-dashboard',
          'reuse': false
        },
        // {
        //   'text': '联系函',
        //   'link': '/contact-letter-mgmt',
        //   'icon': 'fa fa-envelope-o',
        //   'reuse': false
        // },
        {
          'text': '配置管理',
          'icon': 'anticon anticon-setting',
          'group': true,
          'children': [
            {
              'text': '部门管理',
              'link': '/department-mgmt',
              'reuse': false
            },
            {
              'text': '角色管理',
              'link': '/role-mgmt',
              'reuse': false
            },
            {
              'text': '用户管理',
              'link': '/user-mgmt',
              'reuse': false
            },
            {
              'text':'流程管理',
              'link':'/production-line-mgmt',
              'reuse':false
            }
          ]
        },
        // {
        //   'text': '成本管理',
        //   'icon': 'anticon anticon-setting',
        //   'group': true,
        //   'children': [
        //     {
        //       'text': '采购商管理',
        //       'link': '/supplier-management',
        //       'reuse': false
        //     },
        //     {
        //       'text': '入库单',
        //       'link': '/materials-inbound',
        //       'reuse': false
        //     },
        //     {
        //       'text': '物料分类',
        //       'link': '/materials-type',
        //       'reuse': false
        //     },
        //     {
        //       'text': '物料池',
        //       'link': '/materials-data',
        //       'reuse': false
        //     },
        //     {
        //       'text': '出库单',
        //       'link': '/materials-outbound',
        //       'reuse': false
        //     },
        //     {
        //       'text': '退库单',
        //       'link': '/materials-return',
        //       'reuse': false
        //     }
        //   ]
        // },
        {
          'text': '企业管理',
          'link': '/enterprise-mgmt',
          'icon': 'fa fa-building',
          'reuse': false
        }
      ]
    }
  ]
}

export function getProjectMenus() {
  let ProjectMenus = _.cloneDeep(getCommonMenus());
  ProjectMenus[0].children.push(...[
    {
      'text': 'KPI看板',
      'icon': 'fa fa-compass',
      'link': '/kpi/:projectId',
      'reuse': false,
      'guard': true
    },
    {
      'text': '合同管理',
      'icon': 'fa fa-file-text-o',
      'group': true,
      'guard': true,
      'children': [
        {
          'text': '项目信息',
          'link': '/project-detail/:projectId',
          'reuse': false
        },
        {
          'text': '收款及开票管理',
          'link': '/receipt-and-invoice-mgmt/:projectId',
          'reuse': false
        }
      ]
    },
    {
      'text': '计划管理',
      'icon': 'fa fa-calendar-check-o',
      'group': true,
      'guard': true,
      'children': [
        {
          'text': '制定实施计划',
          'link': '/implement-plan-create/:projectId',
          'reuse': false
        },
        {
          'text': '查看计划',
          'link': '/implement-plan-detail/:projectId',
          'reuse': false
        }
      ]
    },
    {
      'text': '技术管理',
      'icon': 'fa fa-cloud-upload',
      'group': true,
      'guard': true,
      'children': [
        {
          'text': '清单导入',
          'link': '/inventory-import/:projectId',
          'reuse': false
        }
      ]
    },
    {
      'text': '商务管理',
      'icon': 'fa fa-briefcase',
      'group': true,
      'guard': true,
      'children': [
        {
          'text': '商务录入',
          'link': '/business-entry/:projectId',
          'reuse': false
        }
      ]
    },
    // {
    //   'text': '供应商管理',
    //   'icon': 'fa fa-address-book-o',
    //   'group': true,
    //   'guard': true,
    //   'children': [
    //     {
    //       'text': '产品分包',
    //       'link': '/product-subcontract-c/:projectId',
    //       'reuse': false
    //     }
    //   ]
    // },
    {
      'text': '生产管理',
      'icon': 'fa fa-industry',
      'link': '/production-mgmt/:projectId',
      'guard': true,
      'reuse': false
    },
    {
      'text': '品质管理',
      'icon': 'fa fa-eye',
      'link': '/quality-mgmt/:projectId',
      'guard': true,
      'reuse': false
    },
    {
      'text': '出入库管理',
      'icon': 'fa fa-tint',
      'link': '/inbound-and-outbound-mgmt/:projectId',
      'guard': true,
      'reuse': false
    },
    {
      'text': '工程管理',
      'icon': 'fa fa-wrench',
      'group': true,
      'guard': true,
      'children': [
        {
          'text': '收安统计',
          'link': '/finished-product-receipt-and-fix-static/:projectId',
          'reuse': false
        },
        // {
        //   'text': '计划管理',
        //   'link': '/project-plan/:projectId',
        //   'reuse': false
        // },
        // {
        //   'text': '施工资料管理',
        //   'link': '/construction-material/:projectId',
        //   'reuse': false
        // }
      ]
    },
    {
      'text': '巡检管理',
      'icon': 'fa fa-binoculars',
      'link': '/inspections-mgmt/:projectId',
      'guard': true,
      'reuse': false
    },
    {
      'text': '总进度看板',
      'icon': 'fa fa-binoculars',
      'link': '/total-progress/:projectId',
      'guard': true,
      'reuse': false
    }
  ])
  return ProjectMenus
}
