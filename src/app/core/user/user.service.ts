import * as moment from 'moment'
import * as _ from 'lodash'
import { Headers } from '@angular/http'
import { Injectable } from '@angular/core'
import { _HttpClient } from '@delon/theme/services/http/http.client'
import { User } from '@core/user/user'
import { UtilService } from '@core/util/util.service'
import { HttpClientService } from '@core/http-client/http-client.service'
import { UserLoginDto } from '@core/user/user-login-dto'
import { Router } from '@angular/router'
import { PagingData } from '../common-entity/paging-data'
import { SuperAdminRoleName, LocalstorageUserKey } from '../../constant/variable.constant'
import { BehaviorSubject } from 'rxjs'
import { LogDTO } from './log-dto';
import swal, { SweetAlertType } from 'sweetalert2'


@Injectable()
export class UserService {


    user = new BehaviorSubject<any>(new User())
    private tokenKey = 'building-token'

    private currentUser: Promise<User>

    constructor(
        private http: HttpClientService,
        private utilService: UtilService,
        private router: Router
    ) {
        this.getUser()
    }

    /**
     * 登录接口
     *
     * @param dto
     * @return token
     */
    async login(dto: UserLoginDto): Promise<string> {
        const header = new Headers(dto)
        const token = await this.http.get(`/users/actions/login`, header).toPromise()
        this.currentUser = null // 重置当前用户
        this.saveTokenToLocalStorage(token)
        await this.saveUserToLocalStorage(this.getUser()) // 将用户存到localstorage中
        return token
    }

    /**
     * 保存token
     *
     * @param token
     */
    saveTokenToLocalStorage(token: string) {
        localStorage.setItem(this.tokenKey, token)
    }

    /**
     * 保存用户
     *
     * @param user
     */
    async saveUserToLocalStorage(user: Promise<User>) {
        localStorage.setItem(LocalstorageUserKey, JSON.stringify(await user))
    }

    /**
     * 获取存在localStorage中的token
     *
     * 不存在就跳转到登录页
     */
    getToken(): string {
        const token = localStorage.getItem(this.tokenKey)
        if (token) return token
        this.router.navigate(['/passport', 'login'])
    }

    /**
     * 获取当前用户信息
     */
    getUser(): Promise<User> {
        if (!this.currentUser) {
            this.currentUser = this.getCurrentUserInfo()
            this.getCurrentUser()
            this.saveUserToLocalStorage(this.currentUser)
        }
        return this.currentUser
    }

    /**
     * 获取当前登录的用户的信息
     */
    getCurrentUserInfo(): Promise<User> {
        return this.http.get('/users/info').toPromise()
    }


    async getCurrentUser() {
        const response = await this.http.get('/users/info').toPromise();
        if (!response) {
            this.router.navigate(['/passport', 'login'])
        }
        this.user.next(response);
        // return this.http.get('/users/info')
        // this.user = await this.http.get('/users/info').toPromise()
    }

    /**
     * 获取当前用户的公司id
     */
    async getCurrentUserCompanyId(): Promise<number> {
        return (await this.getUser()).companyId
    }

    /**
     * 当前用户是否为超级管理员
     *
     * 用角色名称判断
     */
    async currentUserIsAdmin(): Promise<boolean> {
        return (await this.getUser()).role.name === SuperAdminRoleName
    }

    /**
     * 获取st需要的header中的token对象
     */
    getReqHeaderToken(): {Authorization: string} {
        return {Authorization: `cat ${this.getToken()}`}
    }

    /** */
    async getNotices(userId: number) {
        // const size = 1000
        return await this.http.get(`/notices/unread-notices/actions/list?userId=${userId}`).toPromise()
    }

    async getNoticesCount(userId: number) {
        return await this.http.get(`/notices/actions/count?userId=${userId}`).toPromise();
    }

    async read(userId: number, noticeId: number) {
        return await this.http.get(`/notices/actions/read?userId=${userId}&noticeId=${noticeId}`).toPromise();
    }

    async reset(query: any):Promise<any> {
        return await this.http.put(`/users/password/actions/reset`, query).toPromise()
    }

    async send(phone):Promise<any> {
        return await this.http.get(`/users/verify_codes/actions/send?phone=${phone}`).toPromise()
    }

    async addLog(query: LogDTO):Promise<any> { 
        const user = await this.getUser();
        query.userId = user.id;
        return await this.http.post(`/operation-logs`, query).toPromise()
    }

    async showAlert() {
        return  swal({
            title: '执行原因描述',
            input: 'text',
            showCancelButton: true,
        })
    }
    async companyList(query:any) {
        return await this.http.get(`/companies?${this.utilService.objToSearch(query)}`).toPromise();
    }
}
