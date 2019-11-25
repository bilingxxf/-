import { TreeNode } from '../treeNode';
import { MaterialKind } from './material-kind';

export class MaterialVariety {
  companyId: number;
  varietiesCode: string;
  varietiesName: string;
  typeId: number;
  level = 2;
  createTime?: Date;
  updateTime?: Date;
  id?: number;

  children: MaterialKind[] = [] 

  get uuid() {
    return Number(this.id + '' + this.level)
  }

  // get treeNode() {
  //   let treeNode = new TreeNode(this.varietiesName, this.id, true, []);
  //   Object.assign(treeNode, {
  //     __source__: this,
  //     ...(this as Object)
  //   });
  //   return treeNode;
  // }

  transToTreeNode() {
    let treeNode = new TreeNode(this.varietiesName, this.uuid, true, this.children.map(val => val.transToTreeNode()));
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