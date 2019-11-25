/**
 * Options to send http requests
 */

import { PageParams } from './page-params';

export interface RequestOption {

  // request 
  url?: string;
  params?: {[key: string]: any};
  data?: {[key: string]: any};
  headers?: {[key: string]: any};

  // validation

  // if true, backend should return an array of results
  isArray?: boolean;

  // if true, backend should return a PageResponse
  isPaged?: boolean;

  // after request
  afterRequest?: (res: any) => any;
}

/**
 * For paged queries
 */
export interface PageRequestOption extends RequestOption {
  params?: PageParams;
}
