export class Attachment {
    id: number
    fileName: string
    filePath: string

    /**
     * 获取拼接之后的路径
     */
    getPath(): string {
        return `/files/${this.filePath}${this.fileName}`
    }
}
