import { ProjectInfoCDto } from './project-info-c-dto'
import { ProjectCustomerCreateDto } from './project-customer-create-dto'
import { ProjectPaymentRemindCDto } from '@core/project/project-payment-remind-c-dto'
import { ProjectWorkloadCDto } from './project-workload-c-dto'
export class ProjectCDto {
    customer = new ProjectCustomerCreateDto()

    paymentRemindList: ProjectPaymentRemindCDto[] = []

    project = new ProjectInfoCDto()

    quantityComparisonMap: ProjectWorkloadCDto[] = []

    userId: number
}
