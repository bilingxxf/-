import { Component, OnInit } from '@angular/core'
import { _HttpClient } from '@delon/theme'
import { ContactLetterService } from '../../../core/contact-letter/contact-letter.service'
import { ContactLetterDetail } from '../../../core/contact-letter/contact-letter-detail'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-contact-letter-detail-page',
  templateUrl: './contact-letter-detail-page.component.html',
})
export class ContactLetterDetailPageComponent implements OnInit {

    contactLetterDetail = new ContactLetterDetail()

    constructor(
        private contactLetterService: ContactLetterService,
        private route: ActivatedRoute
    ) { }

    async ngOnInit() {
        this.route.params.subscribe(async ({ id }) => {
            this.contactLetterDetail = await this.contactLetterService.f(id)
        })
    }
}
