import { Component, OnInit, ViewChild } from '@angular/core';
import swal, { SweetAlertType } from 'sweetalert2'
import { PermissionService } from '../../../core/permission/permission.service';
import { PermissionModuleDTO, LinkPermissionAndGroupDTO, GetPermissionFromGroupDTO } from '../../../core/permission/permission-module.dto';
import { NzMessageService } from 'ng-zorro-antd'
import { ITreeState, ITreeOptions, TreeComponent, TreeModel, TREE_ACTIONS } from 'angular-tree-component';

class TreeNode {
    name: string;
    id: number;
    children: TreeNode[];
    constructor(name: string, id: number, children: TreeNode[] = []) {
        this.name = name;
        this.id = id;
        this.children = children
    }
}

let uuid = 10001;


@Component({
  selector: 'app-permission-management-page',
  templateUrl: './permission-management-page.component.html',
})
export class PermissionManagementPageComponent implements OnInit {
    nodes = [];
    
    options: ITreeOptions = {
        getChildren: (node:TreeNode) => {
            console.log(11111);
            // console.log(node);
        },
        allowDrag: (node) => true,
        actionMapping: {
            mouse: {
                // click: async (tree: TreeModel, node: any, $event: any) => {
                //     const nodeElement = node.data;
                //     if (nodeElement.name === '编辑权' || nodeElement.name === '查看权') {
                //         if (!nodeElement.children.length) {
                //             const query = new GetPermissionFromGroupDTO()
                //             query.groupId = nodeElement.groupId;
                //             query.type = nodeElement.type;
                //             const response = await this.permissionService.getPermissionFromGroup(query);
                //             nodeElement.children = response;
                //             this.tree.treeModel.update();
                //         }
                //     }
                //     TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event);
                // },
                drop(tree: TreeModel, node: any, $event: any, {from, to}) {
                    const parent = to.parent.data;
                    if (parent.name === '编辑权' || parent.name === '查看权') {
                        TREE_ACTIONS.MOVE_NODE(tree, node, $event, {from, to})
                    }
                },
                dragStart(tree: TreeModel, node: any, $event: any) {
                    const _nodeElement = node.data;
                    if (!_nodeElement.type) {
                        $event.preventDefault()
                    }
                },
            }
        },
        
         
    };
    state: ITreeState = {
        // hiddenNodeIds: {},
        // activeNodeIds: {},
        // expandedNodeIds: {}
    }
    premissions = [];

    @ViewChild(TreeComponent)
    private tree: TreeComponent;

    @ViewChild(TreeComponent)
    private premission: TreeComponent;

    groupNames: string[] = [];

    async getChildren($event) {
        const nodeElement = $event.node.data;
        if (nodeElement.name === '编辑权' || nodeElement.name === '查看权') {
            if (!nodeElement.children.length) {
                const query = new GetPermissionFromGroupDTO()
                query.groupId = nodeElement.groupId;
                query.type = nodeElement.type;
                const response = await this.permissionService.getPermissionFromGroup(query);
                nodeElement.children = response;
                this.tree.treeModel.update();
            }
        }
    }

    async onMoveNode($event) {
        const nodeElement = $event.node;
        const parent = $event.to.parent;
        if (parent.name === '编辑权' || parent.name === '查看权') {
            try {
                await this.permissionService.removePermisssionFromGroup(nodeElement.id)
            } catch(e) {
                console.log(e);
            }
            const query = new LinkPermissionAndGroupDTO()
            query.type = parent.type;
            query.permissionIdList = [nodeElement.id];
            query.groupId = parent.groupId;
            try {
                const response = await this.permissionService.linkPermissionGroup(query);
                this.message.success('操作成功');
            } catch (e) {
                this.message.error(e.error.message);
            }
        }
    }

    linkPermisssionGroup() {

    }

    removePermissionFromGroup() {

    }

    onEvent(ev: any) {
        console.log('onEvent', ev);
    }

    async addNewPermissionsModule() {
        swal({
            title: '请输入权限模块名称',
            input: 'text',
            showCancelButton: true
        }).then(async resp => {
            if (resp.value) {
                const query = new PermissionModuleDTO();
                query.name = resp.value;
                query.description = resp.value;
                try {
                    const response = await this.permissionService.addNewPermissionsModule(query);
                } catch (e) {
                    this.message.error(e.error.message)
                }
            }
        })
    }

    async getAllPermission() {
        const response = await this.permissionService.getAll();
        this.premissions = [].concat(...response).filter(val => {
            return this.groupNames.indexOf(val.groupName) < 0
        });
    }

    async getPermissionModule() {
        const response = await this.permissionService.getsPermissionsModule();
        for (let name in response) {
            this.groupNames.push(name);
            let children = response[name].map(val => {
                let lv3_edit = new TreeNode('编辑权', ++uuid, []);
                let lv3_query = new TreeNode('查看权', ++uuid, []);
                Object.assign(lv3_edit, {
                    groupId: val.id,
                    type: 1,
                    hasChildren: true
                })
                Object.assign(lv3_query, {
                    groupId: val.id,
                    type: 2,
                    hasChildren: true
                })
                const lv3 = [
                    lv3_edit,
                    lv3_query
                ]
                val.children = lv3;
                // val.
                return val
            })
            const moduleId = children[0].moduleId;
            const node = new TreeNode(name, moduleId, children);
            this.nodes.push(node);
        }
        console.log(this.nodes);
        this.tree.treeModel.update();
    }

    constructor(
        private permissionService: PermissionService,
        private message: NzMessageService
    ) { }

    async ngOnInit() {
        await this.getPermissionModule();
        this.getAllPermission();
    }

}


