import { Component, OnInit } from '@angular/core'
import { ContactLetterQueryDto } from '../../../core/contact-letter/contact-letter-query-dto'
import { PagingData } from '@core/common-entity/paging-data'
import { ContactLetter } from '../../../core/contact-letter/contact-letter'
import { ContactLetterService } from '../../../core/contact-letter/contact-letter.service'

@Component({
  selector: 'app-contact-letter-mgmt-page',
  templateUrl: './contact-letter-mgmt-page.component.html',
})
export class ContactLetterMgmtPageComponent implements OnInit {

    dto = new ContactLetterQueryDto()

    data = new PagingData<ContactLetter>()

    constructor(
        private contactLetterService: ContactLetterService
    ) { }

    ngOnInit() {
        this.getData()
    }

    async getData() {
        this.data = await this.contactLetterService.list(this.dto)
    }
}
