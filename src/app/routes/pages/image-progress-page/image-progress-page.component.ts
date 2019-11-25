import { Component, OnInit, Input } from '@angular/core'
import { FileService } from '../../../core/file/file.service'
import { ImageProgress } from '@core/file/image-progress'

@Component({
  selector: 'app-image-progress-page',
  templateUrl: './image-progress-page.component.html',
  styleUrls: ['./image-progress-page.component.less']
})
export class ImageProgressPageComponent implements OnInit {

    @Input() projectId: number

    images: ImageProgress[] = []

    constructor(
        private fileService: FileService
    ) { }

    async ngOnInit() {
        this.images = await this.fileService.getImageProgress(this.projectId)
    }

}
