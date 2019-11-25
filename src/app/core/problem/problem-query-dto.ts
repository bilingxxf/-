import { Paginate } from '../common-entity/paginate'

export class ProblemQueryDto extends Paginate {
  projectId: number

  userId: number

  typeList: number[]
}
