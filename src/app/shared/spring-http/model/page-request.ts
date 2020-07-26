type SortDir = 'asc' | 'desc';

const getSortAndDirFromString = (sort: string, validOptions?: string[]) => {
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
  return { by, dir };
};

export class PageRequest {
  page: number;
  size: number;
  sorts?: { [by: string]: SortDir } = {};

  constructor(page?: any, size?: any, sorts?: {}) {
    this.page = page ? +page : undefined;
    this.size = size ? +size : undefined;
    this.sorts = sorts;
  }

  static of(page: any, size: any, sortArray: string[], sortOptions?: string[]) {
    return new PageRequest(page, size, PageRequest.convertToTheSortType(sortArray, sortOptions));
  }

  private static convertToTheSortType(sortsArr: string[], sortOptions?: string[]) {
    const sorts = {};
    if (sortsArr) {
      if (!Array.isArray(sortsArr)) {
        sortsArr = [sortsArr];
      }
      sortsArr.forEach((sortItem) => {
        const sort = getSortAndDirFromString(sortItem, sortOptions);
        if (sort) {
          sorts[sort.by] = sort.dir as SortDir;
        }
      });
    }
    return sorts;
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
    this.sorts = {};
  }

  addSort(by: string, dir: SortDir) {
    this.sorts[by] = dir;
  }

  addSortBy(by: string) {
    this.addSort(by, this.sorts[by] === 'desc' ? 'asc' : 'desc');
  }

  setSort(by: string, dir: SortDir) {
    this.sorts = {};
    this.addSort(by, dir as SortDir);
  }

  setSortBy(by: string) {
    const dir = this.sorts[by] === 'asc' ? 'desc' : 'asc';
    this.setSort(by, dir as SortDir);
  }

  removeSort(by: string) {
    if (this.sorts[by]) {
      delete this.sorts[by];
    }
  }

  sortChange(by: string, $event: any) {
    if ($event.ctrlKey) {
      this.removeSort(by);
    } else if ($event.shiftKey) {
      this.addSortBy(by);
    } else {
      this.setSortBy(by);
    }
  }

  toHttpParams() {
    const page = this.page;
    const size = this.size;
    const sort = [];
    Object.keys(this.sorts).forEach((by) => {
      const dir = this.sorts[by];
      sort.push(`${by},${dir}`);
    });
    return {
      page,
      size,
      sort,
    };
  }
}
