import { Monomer } from '@core/monomer/monomer'
import { ProjectWorkload } from '@core/project-workload/project-workload'

export class MonomerWithWorkload extends Monomer {
    workloads: ProjectWorkload[] = []
}
