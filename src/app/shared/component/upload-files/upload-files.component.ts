import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { FileService } from '@core/file/file.service'
import { UploadChangeParam } from 'ng-zorro-antd'
import { OriginalFile } from '@core/file/original-file'

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
})
export class UploadFilesComponent implements OnInit {

    @Input() attachments: number[] = []

    @Input() fileType: number

    @Input() originalFiles: OriginalFile[] = []

    @Output() changes = new EventEmitter<number[]>()

    fileList = []

    constructor(
        private fileService: FileService
    ) { }

    ngOnInit() {
        this.fileList = this.originalFiles.map((o, i) => ({
            uid: i - 1,
            name: o.fileName,
            status: 'done',
            response: {data: o.id}
        }))
    }

    handleChange(e: UploadChangeParam) {
        this.fileService.handleFilesUpload(this.attachments, e)
        console.log(`附件: ${this.attachments}`)
        if (e.file.status === 'done' || e.file.status === 'removed') this.changes.emit(this.attachments)
    }

}
