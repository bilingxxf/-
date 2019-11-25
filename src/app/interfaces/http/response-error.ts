/**
 * Format of error responses
 */

import { RequestOption } from './request-option';
import { ResponseData } from './response-data';

export interface ResponseError {
  code: number;
  error: ResponseData;
  message: string;
  request: RequestOption;
  status: number;
}
