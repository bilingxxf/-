import { Pagination } from './pagination'

export class PagingData<T> extends Pagination {
  data: Array<T> = []
  linkList: any
  id: number
  constructor() {
    super()
  }
}
