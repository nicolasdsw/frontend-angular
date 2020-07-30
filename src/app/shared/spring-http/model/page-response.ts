import { PageRequest } from './page-request';

export interface PageResponse<T> {
  cacheCount: number;
  totalPages: number;
  totalElements: number;
  size: number;
  content: T[];
  number: number;
  sort: {
    sorted: true;
    unsorted: true;
    empty: true;
  };
  pageable: PageRequest;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
