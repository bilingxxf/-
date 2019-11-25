export class TreeNode {
  name: string;
  id: number;
  children: TreeNode[];
  hasChildren: boolean;
  [key: string]: any;
  constructor(name: string, id: number, hasChildren: boolean, children?: TreeNode[]) {
      this.name = name;
      this.id = id;
      this.children = children;
      this.hasChildren = hasChildren;
  }
}