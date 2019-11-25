import { Component, OnInit, Input } from '@angular/core'
import { InspectionsListItem } from '@core/inspections/inspections-list-item'
import { FileService } from '../../../../core/file/file.service'
import { Attachment } from '../../../../core/common-entity/attachment'

@Component({
  selector: 'app-inspection-detail-modal',
  templateUrl: './inspection-detail-modal.component.html',
})
export class InspectionDetailModalComponent implements OnInit {

    @Input() inspectionsListItem = new InspectionsListItem()

    images: Attachment[] = []

    constructor(
      private fileService: FileService
    ) { }

    async ngOnInit() {
      this.images = await Promise.all(this.inspectionsListItem.picList.map(id => this.fileService.getAttachmentDetail(id)))
      // console.log(this.images)
    }

}
