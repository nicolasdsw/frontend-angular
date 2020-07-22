type SortDir = 'asc' | 'desc';
class Sort {
  by: string;
  dir: SortDir;

  constructor(by: string, dir: SortDir) {
    this.by = by;
    this.dir = dir;
  }

  static of(sort: string, validOptions?: string[]) {
    let by = '';
    let dir = 'asc';
    if (sort.includes(',')) {
      const p = sort.split(',');
      by = p[0];
      if (p[1] === 'desc') {
        dir = 'desc';
      }
    } else {
      by = sort;
    }
    if (validOptions?.length && !validOptions.includes(by)) {
      return null;
    }
    return new Sort(by, dir as SortDir);
  }

  joinCols(): string {
    return `${this.by},${this.dir}`;
  }
}

export class PageRequest {
  page: number;
  size: number;
  sort: Sort[];

  constructor(page: any, size: any, sort?: Sort[]) {
    this.page = page ? +page : undefined;
    this.size = size ? +size : undefined;
    this.sort = sort;
  }

  static of(page: any, size: any, sortArray: string[], sortOptions?: string[]) {
    return new PageRequest(page, size, PageRequest.convertToTheSortType(sortArray, sortOptions));
  }

  private static convertToTheSortType(sort: string[], options?: string[]) {
    if (sort) {
      if (!Array.isArray(sort)) {
        sort = [sort];
      }
      return sort.map((s) => Sort.of(s, options)).filter((s) => s !== null);
    }
  }

  prev() {
    const page = this.page || 0;
    if (page > 0) {
      this.page = page - 1;
    }
  }

  next() {
    const page = this.page || 0;
    this.page = page + 1;
  }

  cleanSort() {
    this.sort = [];
  }

  addSort(by: string, dir: SortDir) {
    if (!this.sort) {
      this.cleanSort();
    }
    this.sort = [...this.sort, new Sort(by, dir)];
  }

  addSortBy(by: string) {
    const alreadyExists = this.sort?.filter((s) => s.by === by);
    if (alreadyExists?.length) {
      alreadyExists[0].dir = alreadyExists[0].dir === 'desc' ? 'asc' : 'desc';
    } else {
      this.addSort(by, 'asc');
    }
  }

  setSort(by: string, dir: SortDir) {
    this.sort = [];
    this.addSort(by, dir);
  }

  setSortBy(by: string) {
    const dir = this.sort?.filter((s) => s.by === by)[0]?.dir === 'asc' ? 'desc' : 'asc';
    this.setSort(by, dir);
  }

  toHttpParams() {
    const page = this.page;
    const size = this.size;
    const sort = this.sort?.map((s) => s.joinCols());
    return {
      page,
      size,
      sort,
    };
  }
}
