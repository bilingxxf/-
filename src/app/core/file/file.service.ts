import { Injectable } from '@angular/core'
import { UploadChangeParam, UploadFile, NzMessageService } from 'ng-zorro-antd'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '../util/util.service'
import { ImageProgress } from './image-progress'
import { ImageProgressQueryDto } from '@core/file/image-progress-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { GetImageProgressResItemDto } from '@core/file/get-image-progress-res-item-dto'
import { Attachment } from '@core/common-entity/attachment'
import { plainToClass } from 'class-transformer'

@Injectable()
export class FileService {

    constructor(
        private msg: NzMessageService,
        private http: HttpClientService,
        private utilService: UtilService
    ) { }

    /**
     * 处理多附件情况
     *
     * @param attachments 附件数组
     * @param e ant upload 组件事件对象
     */
    handleFilesUpload(attachments: number[] = [], e: UploadChangeParam) {
        const file = e.file
        const status = file.status
        if (status === 'done') {
            attachments.push(file.response.data)
            this.msg.success(`${file.name} 上传成功`)
        } else if (status === 'error') {
            this.msg.error(`${file.name} 上传失败`)
        } else if (status === 'removed') {
            if (!file.response) return
            const id = file.response.data
            if (!id) return
            attachments.splice(attachments.indexOf(id), 1)
        }
    }

    /**
     * 获取附件详情
     *
     * @param id
     */
    getAttachmentDetail(id: number): Promise<Attachment> {
        return this.http.get(`/attachments/${id}`)
            .map((res: Attachment) => plainToClass(Attachment, res))
            .toPromise()
    }

    /**
     * 下载附件
     *
     * @param id 附件id
     */
    downloadAttachment(id: number): Promise<void> {
        return this.http.get(`/attachments/actions/download?${this.utilService.objToSearch({ id })}`).toPromise()
    }

    /**
     * 获取一个项目的形象进度图片
     *
     * @param projectId
     */
    async getImageProgress(projectId: number): Promise<ImageProgress[]> {
        const dto = new ImageProgressQueryDto()
        dto.projectId = projectId
        dto.size = 1000
        const pageingData: PagingData<GetImageProgressResItemDto> = await this.http.get(`/projects/images?${this.utilService.objToSearch(dto)}`).toPromise()
        const data: ImageProgress[] = []
        pageingData.data.forEach(o => {
            o.dailyImageInfo.forEach(image => {
                if (!image.photo) return
                data.push({
                    url: `/files/${image.photo.filePath}${image.photo.fileName}`,
                    createTime: image.photo.createTime
                })
            })
        })

        return data.sort((o1, o2) => o2.createTime - o1.createTime)
    }

}
