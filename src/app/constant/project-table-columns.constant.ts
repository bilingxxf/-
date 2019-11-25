import { SimpleTableColumn } from '@delon/abc'
import { ProjectStatus } from './project-status.enum'

const dateFormat = 'YYYY-MM-DD'

export const ProjectTableColums: SimpleTableColumn[] = [
    {
        title: '项目名称',
        index: 'name'
    },
    {
        title: '总工期',
        index: 'totalDate'
    },
    {
        title: '完成时间',
        index: 'endDate',
        type: 'date',
        dateFormat
    },
    {
        title: '当前用时',
        index: 'timeCost'
    },
    {
        title: '用时比例',
        index: 'timeRatio'
    },
    {
        title: '完成合同额',
        index: 'completeContractAmount'
    },
    {
        title: '完成比例',
        index: 'completeContractRatio'
    },
    {
        title: '状态',
        index: 'status',
        format: (p) => {
            return ProjectStatus[p.status]
        }
    }
]
