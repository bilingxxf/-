/**
 * Response for a paged query
 */

export interface PageResponse<T> {
  data: T[];
  totalCount: number;
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}
