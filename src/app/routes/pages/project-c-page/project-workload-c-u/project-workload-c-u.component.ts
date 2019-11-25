import * as _ from 'lodash'
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { MonomerCreateDto } from '@core/project/monomer-create-dto'
import { ProjectWorkloadCDto } from '@core/project/project-workload-c-dto'

@Component({
  selector: 'app-project-workload-c-u',
  templateUrl: './project-workload-c-u.component.html',
})
export class ProjectWorkloadCUComponent implements OnInit {

    submitting = false

    @Input() monomers: MonomerCreateDto[] = []

    @Input() btnText = ''

    @Output() onSubmitted = new EventEmitter<any>()

    constructor(
    ) { }

    ngOnInit() {
        // this.monomers
        let monomer = this.monomers[0];
        if (!monomer.id) {
            this.monomers.forEach(m => {
                m.workloads = [];
                const componentDto = new ProjectWorkloadCDto()
                const maintainDto = new ProjectWorkloadCDto()
                componentDto.productName = '构件'
                componentDto.unit = 't'
//              maintainDto.productName = '围护'
                maintainDto.unit = '㎡'
                m.workloads.push(componentDto)
                m.workloads.push(maintainDto)
            })
        }
    }

    // ngOnInit() {
    //     setTimeout(() => {
    //         console.log(this.monomers);
    //         this.monomers.forEach(m => {
    //             const componentDto = new ProjectWorkloadCDto()
    //             const maintainDto = new ProjectWorkloadCDto()
    //             componentDto.productName = '构件'
    //             componentDto.unit = '吨'
    //             maintainDto.productName = '围护'
    //             maintainDto.unit = '平方'
    //             m.workloads.push(componentDto)
    //             m.workloads.push(maintainDto)
    //         })
    //     }, 0)
    // }

    async ok() {
        this.onSubmitted.emit(this.monomers)
    }

    canSubmit(): boolean {
        return this.monomers.every(w => w.workloads.every(o => !!o.biddingQuantity || o.biddingQuantity === 0))
    }

}
