import 'rxjs/add/operator/map'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'

import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import { environment } from '@env/environment'
import { HttpErrorResponse } from '@angular/common/http'
import { NzMessageService } from 'ng-zorro-antd';


@Injectable()
export class HttpClientService {

    constructor(
        private http: Http,
        private router: Router,
        private msg: NzMessageService
    ) { }

    /**
     * get 请求
     *
     * @param url
     * @param header
     */
    get(url: string, header?: Headers): Observable<any> {
        this.checkUrl(url)

        return this.http.get(`${environment.SERVER_URL}${url}`, {headers: Object.assign(this.getHeader(), header)})
            .map(this._extractData)
            .catch(this.errorHandler.bind(this))
    }

    delete(url): Observable<any> {
        this.checkUrl(url)

        return this.http.delete(`${environment.SERVER_URL}${url}`, {headers: this.getHeader()})
            .map(this._extractData)
            .catch(this.errorHandler.bind(this))
    }

    /**
     * post
     *
     * @param url 路径
     * @param data 请求体
     */
    post(url, data = null): Observable<any> {
        this.checkUrl(url)

        const headers = this.getHeader()
        headers.append('Content-Type', 'application/json')

        return this.http.post(`${environment.SERVER_URL}${url}`, data, { headers })
            .map(this._extractData)
            .catch((this.errorHandler.bind(this)))
    }

    /**
     * patch
     *
     * @param url 路径
     * @param data 请求体
     */
    patch(url, data): Observable<any> {
        this.checkUrl(url)

        const headers = this.getHeader()
        headers.append('Content-Type', 'application/json')

        return this.http.patch(`${environment.SERVER_URL}${url}`, data, { headers })
            .map(this._extractData)
            .catch((this.errorHandler.bind(this)))
    }

    /**
     * put
     *
     * @param url 路径
     * @param data 请求体
     */
    put(url, data): Observable<any> {
        this.checkUrl(url)

        const headers = this.getHeader()
        headers.append('Content-Type', 'application/json')

        return this.http.put(`${environment.SERVER_URL}${url}`, data, { headers })
            .map(this._extractData)
            .catch((this.errorHandler.bind(this)))
    }

    private getHeader() {
        const headers = new Headers()
        const token = localStorage.getItem('building-token')
        if (token) headers.append('Authorization', `cat ${token}`)
        return headers
    }

    private checkUrl(url: String) {
        if (!url || url.charAt(0) !== '/') {
            console.error(`path: ${url} 必须以"/"开头`)
            throw new Error(`path: ${url} is invalid`)
        }
    }

    // 处理响应对象
    private _extractData(res: Response) {
        const body = res.json()

        // tslint:disable-next-line:triple-equals
        if (body.code != 200 ) {
            if(body.code!=500) {
                throw Observable.throw(body)
            }
        }
        return body.data
    }

    /** 处理http error */
    private errorHandler(error: any) {
        const body = error.error
        if (body && body.code === 401) {
            this.router.navigate(['/passport', 'login'])
        }
        if (+body.code !== 403) {
            this.msg.error(body.message);
        }
        throw Observable.throw(body) // 继续往外抛，让ctrl去处理
    }
}
