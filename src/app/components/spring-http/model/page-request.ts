import { SearchUtil } from '../utils/search-util';

export class PageRequest {
  page: number;
  size: number;
  sort: string[];

  constructor(page: any, size: any, sort?: any) {
    this.page = page ? +page : 0;
    this.size = size ? +size : undefined;
    this.sort = sort;
  }

  prev() {
    if (this.page > 0) {
      this.page -= 1;
    }
  }

  next() {
    this.page += 1;
  }
}
