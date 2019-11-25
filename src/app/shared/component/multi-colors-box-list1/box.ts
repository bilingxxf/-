import { ColorArea } from '@shared/component/multi-color-box/color-area'

export class Box {
  areas: ColorArea[] = []

  tooltip?: string

  content: string

  click?: Function

  isChecked?: boolean
  id?: number
  total?: number;
  current?: number;
  plans? : any[];
  length: number = 0;
}
