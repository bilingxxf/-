/**
 * Query params for a paged list
 */

export interface PageParams {
  page: number;
  size: number;
  orderBy?: string;
  [key: string]: any;
}
