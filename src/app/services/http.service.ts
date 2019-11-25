import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, first, tap , map } from 'rxjs/operators';
import * as moment from 'moment';
import { PageRequestOption, PageResponse, RequestOption, ResponseData, ResponseError } from '../interfaces';


import { API_URL_PREFIX, API_VERSION, AUTH_HEADER_NAME, ENTRY_POINT, AUTH_TOKEN_NAME } from '../constant';
import { NzMessageService } from 'ng-zorro-antd';


@Injectable()
export class HttpService {
  private urlPrefix = API_URL_PREFIX;
  protected url = '';

  state: {[key: string]: any } = {
    loading$: new BehaviorSubject<boolean>(false)
  };

  http: HttpClient;
  router: Router;
  msg: any

  afterCreate(res: any) {}
  afterQueryList(res: any) {}
  afterQuery(res: any) {}
  afterUpdate(res: any) {}
  afterRemove(id: number) {}

  constructor(
    public injector: Injector
  ) {
    this.http = this.injector.get(HttpClient);
    this.router = this.injector.get(Router);
    this.msg = this.injector.get(NzMessageService);
  }


  get<T>(option: RequestOption):Observable<T> {
    this.beforeRequest(option);
    return <Observable<T>>this.http
      .get(this.getUrl(option), {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

   /**
   * Send post request
   * @param {RequestOption} option
   * @returns {Observable<T>}
   */
  post<T>(option: RequestOption): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .post(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }


    /**
   * Send patch request
   * @param {RequestOption} option
   * @returns {Observable<T>}
   */
  patch<T>(option: RequestOption): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .patch(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send put request
   * @param {RequestOption} option
   * @returns {Observable<T>}
   */
  put<T>(option: RequestOption): Observable<T> {
    this.beforeRequest(option);

    return <Observable<T>>this.http
      .put(this.getUrl(option), option.data, {
        params: option.params,
        headers: option.headers
      })
      .pipe(...this.processResponse(option));
  }

  /**
   * Send delete request
   * @param {RequestOption} option
   * @returns {Observable<T>}
   */
  delete<T>(option: RequestOption): Observable<T> {
    this.beforeRequest(option);

    return <Observable<any>>this.http
      .delete(this.getUrl(option), <any>{
        params: option.params,
        headers: option.headers,
        body: option.data
      })
      .pipe(...this.processResponse(option));
  }

  // Http helper
  // ---------------------------

   /**
   * Add prefix to request url
   * @param {RequestOption} option
   * @returns {string}
   */
  getUrl(option: RequestOption): string {
    return `${this.urlPrefix}/${option.url}`;
  }


  /**
   * Update an observable and emit a new value
   * @param {BehaviorSubject} subject
   * @param {(p: Project) => Project} callback
   */
  updateObservable<T>(subject: BehaviorSubject<T>, callback: (p: T) => T) {
    subject.pipe(first()).subscribe((project) => {
      subject.next(callback(project) as T);
    });
  }


   /**
   * Process the response
   * @param {RequestOption} option
   * @returns {any[]}
   */
  processResponse<T>(option: RequestOption): any[] {
    return [
      tap((res: ResponseData) => {
        if (this.state.loading$) { this.state.loading$.next(false); }

        if (!res || res.code !== 200) {
          res = res || <ResponseData>{};

          console.error(`Url: "/${option.url}"; Code: ${res.code}; Message: "${res.message}"`);
          if (+res.code !== 403) {
            this.msg.error(res.message);
          }
          throw new HttpErrorResponse({
            error: res,
            status: 200
          });
        }
      }),
      map((res: ResponseData) => res ? res.data : null),
      map((resData: any) => this.validate(resData, option)),
      tap((resData: any) => {
        if (typeof option.afterRequest === 'function') {
          option.afterRequest.call(this, resData);
        }
      }),
      catchError((res: HttpErrorResponse) => this.handleError(res, option))
    ];
  }

  /**
   * Handle request errors
   * @param res - raw response
   * @param {RequestOption} option
   */
  handleError(res: HttpErrorResponse, option: RequestOption): Observable<ResponseError> {
    console.error(res);

    if (this.state.loading$) { this.state.loading$.next(false); }

    this.handleErrorStatus(res);

    return Observable.throw(<ResponseError>{
      request: option,
      error: res.error || {},
      status: res.status,
      code: res.error ? res.error.code : 0
    });
  }

  /**
   * Deal with error status codes
   * @param {HttpErrorResponse} res
   */
  handleErrorStatus(res: HttpErrorResponse) {
    switch (res.status) {

    // redirect to login page if access denied
    case 401:
      const redirect = this.parseRedirectUrl(res);

      if (redirect) {
        return location.replace(redirect);
      }

      this.router.navigate(['/passport', 'login'])
      break;

    // redirect to 404 page
    case 404:
      // this.router.navigate(['/common/404']);


      break;

    // redirect to maintaince page
    case 502:
    case 504:
      // this.router.navigate(['/common/maintenance']);
      break;
    default:
    }
  }

   /**
   * Validate and send default values if no response is returned
   * @param resData - raw response
   * @param {RequestOption} option
   * @returns {any} - validated result
   */
  validate(resData: any, option: RequestOption): any {

    // return an empty array
    if (option.isArray && !Array.isArray(resData)) { return []; }

    // return a PageResponse
    if (option.isPaged) {
      if (!resData) { resData = { data: [], totalCount: 0 }; }
      if (!Array.isArray(resData.data)) { resData.data = []; }
      if (!resData.totalCount || (resData.totalCount < 0)) { resData.totalCount = 0; }

      return resData;
    }

    return resData;
  }

  /**
   * Do something before sending request
   * @param {RequestOption} option
   */
  beforeRequest(option: RequestOption) {
    if (this.state.loading$) { this.state.loading$.next(true); }

    // Add auth header
    if (!option.headers) {
      option.headers = {};
    }

    const authToken = localStorage.getItem(AUTH_TOKEN_NAME);

    if (authToken) {
      option.headers[AUTH_HEADER_NAME] = `cat ${authToken}`;
    }

    if (option.params) {
      option.params = this.formatDateValues(option.params);
    }

    if (option.data && !(option.data instanceof FormData)) {
      option.data = this.formatDateValues(option.data);
    }
  }

  /**
   * Format data values
   * @param object
   * @returns {any}
   */
  private formatDateValues(object: any): any {
    if (!object) { return null; }

    const result = Array.isArray(object) ? [ ...object ] : { ...object };

    Object.getOwnPropertyNames(object).forEach((key) => {
      if (object[key] instanceof Date) {
        result[key] = moment(object[key]).format('YYYY-MM-DD');
      } else if (typeof object[key] === 'object') {
        result[key] = this.formatDateValues(object[key]);
      }
    });

    return result;
  }


  /**
   * Parse redirect URL from 401 error
   * @param {HttpErrorResponse} res
   * @returns {string}
   */
  private parseRedirectUrl(res: HttpErrorResponse): string {

    // The test is run on index.html
    if ((window as any).unsupportBrowser) { return; }

    if (!res || !res.error || !res.error.message) { return; }

    const locationReg = /^Location:/;

    if (!locationReg.test(res.error.message)) { return; }

    return res.error.message.replace(locationReg, '');
  }

}