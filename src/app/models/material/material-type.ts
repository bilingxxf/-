import { TreeNode } from '../treeNode';
import { MaterialVariety } from './material-variety';

export class MaterialType {
  companyId: number;
  typeCode: string;
  typeName: string;
  formType: number;
  level = 1;
  createTime?: Date;
  updateTime?: Date;
  id?: number;
  children: MaterialVariety[] = [];

  get uuid() {
    return Number(this.id + '' + this.level)
  }

  transToTreeNode() {
    let treeNode = new TreeNode(this.typeName, this.uuid, true,  this.children.map(val => val.transToTreeNode()));
    Object.assign(treeNode, {
      __source__: this,
      // ...(this as Object)
    });
    return treeNode;
  }

  constructor(params = {}) {
    return Object.assign(this, params);
  }
}