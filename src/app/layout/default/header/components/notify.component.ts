import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, groupBy, concatMap, mergeMap, flatMap, delay, tap, toArray } from 'rxjs/operators';
import * as moment from 'moment';
import { NoticeItem } from '@delon/abc';
import { SettingsService } from '@delon/theme';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { HttpClientService } from '@core/http-client/http-client.service'
import { UtilService } from '@core/util/util.service'
import { SuperAdminRoleName, LocalstorageUserKey } from '../../../../constant/variable.constant';
import { UserService } from '../../../../core/user/user.service';

/**
 * 菜单通知
 */
@Component({
    selector: 'header-notify',
    template: 
    `
    <notice-icon
        [data]="data"
        [count]="count"
        [loading]="loading"
        (select)="select($event)"
        (clear)="clear($event)"
        (popoverVisibleChange)="loadData($event)"></notice-icon>
    `
//     `
//   <notice-icon count="5"></notice-icon>
//   `
})
export class HeaderNotifyComponent implements OnInit {

    data: NoticeItem[] = [
        { title: '通知', list: [], emptyText: '你已查看所有通知', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg' },
        { title: '消息', list: [], emptyText: '您已读完所有消息', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg' },
        { title: '待办', list: [], emptyText: '你已完成所有待办', emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg' }
    ];
    count = 0;
    loading = false;

    user: any

    constructor(
        private msg: NzMessageService,
        private userService: UserService,
        private settings: SettingsService) {}

    async ngOnInit() {
        const token = localStorage.getItem('building-token');
        this.user = await this.userService.getUser()

        const socket = new SockJS(`https://bim.hzchum.com/bim/ws?Authorization=${token}`)
        const client = Stomp.over(socket);
        client.connect({
        }, (frame) => {
            client.subscribe('/bim/ws/topics/event', (greeting) => {
                this.getNotics();
            })
        })
        this.getNotics();
    }

    async getCount() {
        const count = await this.userService.getNoticesCount(this.user.id);
        this.count = count.count;
    }

    async getNotics() {
        const response = await this.userService.getNotices(this.user.id);
        this.count = response.length;
        this.loadData(
            response.map(val => {
                return {
                    title: val.content,
                    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
                    id: val.noticeId,
                    type: '通知',
                    datetime: moment(val.createTime).format('YYYY-MM-DD HH:mm:ss')
                }
            })
        )
    }

    private parseGroup(data: Observable<any[]>) {
        data.pipe(
                concatMap((i: any) => i),
                map((i: any) => {
                    if (i.datetime) i.datetime = moment(i.datetime).fromNow();
                    // change to color
                    if (i.status) {
                        i.color = ({
                            todo: '',
                            processing: 'blue',
                            urgent: 'red',
                            doing: 'gold',
                        })[i.status];
                    }
                    return i;
                }),
                groupBy((x: any) => x.type),
                mergeMap(g => g.pipe(toArray())),
                tap((ls: any) => {
                    this.data.find(w => w.title === ls[0].type).list = ls;
                })
            ).subscribe(res => this.loading = false);
    }

    loadData(res) {
        if (!res || this.loading || !res.length) return;
        this.loading = true;
        this.parseGroup(ArrayObservable.of(res).pipe(delay(1000)));
    }

    clear(type: string) {
        // this.msg.success(`清空了 ${type}`);
        // this.data
    }

    async select(res: any) {
        console.log('res--------------',res);
        await this.userService.read(this.user.id, res.item.id);
        this.getCount();
        // this.msg.success(`点击了 ${res.title} 的 ${res.item.title}`);
    }
}
