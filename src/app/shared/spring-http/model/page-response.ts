import { PageRequest } from './page-request';

export interface PageResponse<T> {
  cacheCount: number;
  totalPages: number;
  totalElements: number;
  size: number; // page size
  content: T[];
  number: number; // page number
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
