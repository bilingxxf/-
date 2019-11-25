import { ProjectWorkloadCDto } from './project-workload-c-dto'
export class MonomerCreateDto {

    /**
     * 单体名字
     */
    name: string

    /**
     * 单体描述信息
     */
    description?: string

    /**
     * 工作量
     *
     * 实际上接口是不需要的，可我为了数据好管理，设计成这样，一起传到后台就行，不会去处理的
     */
    workloads?: ProjectWorkloadCDto[] = []

    id?: number
}
