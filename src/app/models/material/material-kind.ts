import { TreeNode } from '../treeNode';

export class MaterialKind{
  companyId: number;
  kindCode: string;
  kindName: string;
  minimumInventory: number;
  varietiesId: number;
  unit: string;
  level = 3;
  createTime?: Date;
  updateTime?: Date;
  id?: number;

  get uuid() {
    return Number(this.id + '' + this.level)
  }

  transToTreeNode():TreeNode {
    let treeNode = new TreeNode(this.kindName, this.uuid, false);
    Object.assign(treeNode, {
      __source__: this,
      isLeaf: true
    });
    return treeNode;
  }

  constructor(params = {}) {
    return Object.assign(this, params);
  }
}