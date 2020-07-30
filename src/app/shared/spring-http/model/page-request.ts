export class PageRequest {
  page: number;
  size: number;
  sort: string[];

  constructor(page?: any, size?: any, sort?: string[]) {
    this.page = page ? +page : undefined;
    this.size = size ? +size : undefined;
    this.sort = sort;
  }
}
