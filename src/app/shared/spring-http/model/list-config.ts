import { FormControl } from '@angular/forms';
import { PageRequest } from './page-request';
import { SearchUtil } from '../utils/search-util';

const ASC = 'asc';
const DESC = 'desc';
type SortDir = 'asc' | 'desc';
interface SortType {
  [by: string]: SortDir;
}

function getSortAndDirFromString(sort: string, validOptions?: string[]) {
  let by = '';
  let dir = ASC;
  if (sort.includes(',')) {
    const p = sort.split(',');
    by = p[0];
    if (p[1] === DESC) {
      dir = DESC;
    }
  } else {
    by = sort;
  }
  if (validOptions?.length && !validOptions.includes(by)) {
    return null;
  }
  return { by, dir };
}

function convertSortsArrToTheSortType(sortsArr: string[], sortOptions?: string[]) {
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

function converSortTypeToSortArr(sorts: SortType) {
  const sortsArr = [];
  Object.keys(sorts).forEach((by) => {
    const dir = sorts[by];
    sortsArr.push(`${by},${dir}`);
  });
  return sortsArr;
}

export interface ListConfigParams {
  sortOptions: string[];
  sizeControl: FormControl;
  sizeOptions: number[];
  onSizeChange?: () => {};
  onPageChange?: () => {};
  onSortsChange?: () => {};
  onParamsChange?: () => {};
}

export class ListConfig {
  sortOptions: string[];
  sizeControl: FormControl;
  sizeOptions: number[];
  sizeDefault: number;
  page: number;
  size: number;
  sorts: SortType;
  onSizeChange: (newSize: number) => void;
  onPageChange: (newPage: number) => void;
  onSortsChange: (newSorts?: { [by: string]: SortDir }) => void;
  onParamsChange: () => void;

  constructor(params: ListConfigParams) {
    this.sortOptions = params.sortOptions;
    this.sizeControl = params.sizeControl;
    this.sizeOptions = params.sizeOptions;
    this.onSizeChange = params.onSizeChange;
    this.onPageChange = params.onPageChange;
    this.onSortsChange = params.onSortsChange;
    this.onParamsChange = params.onParamsChange;

    if (!this.sizeControl.value) {
      this.sizeDefault = 10;
      this.sizeControl.setValue(this.sizeDefault);
    } else {
      this.sizeDefault = this.sizeControl.value;
    }
    this.page = 0;
    this.sorts = {};
    this.size = this.sizeDefault;

    this.sizeControl.valueChanges.subscribe((newVal) => {
      const newValNumber = +newVal || null;
      if (newValNumber && newValNumber !== this.size) {
        this.size = newValNumber;
        this.sizeCallback();
      }
    });
  }

  private sizeCallback() {
    if (this.onSizeChange) {
      this.onSizeChange(this.size);
    } else if (this.onParamsChange) {
      this.onParamsChange();
    }
  }

  private pageCallback() {
    if (this.onPageChange) {
      this.onPageChange(this.page);
    } else if (this.onParamsChange) {
      this.onParamsChange();
    }
  }

  private sortsCallback() {
    if (this.onSortsChange) {
      this.onSortsChange(this.sorts);
    } else if (this.onParamsChange) {
      this.onParamsChange();
    }
  }

  private addSortBy(by: string) {
    this.sorts[by] = this.sorts[by] === DESC ? ASC : DESC;
  }

  private setSortBy(by: string) {
    const dir = this.sorts[by] === ASC ? DESC : ASC;
    this.sorts = {};
    this.sorts[by] = dir;
  }

  private removeSort(by: string) {
    if (this.sorts[by]) {
      delete this.sorts[by];
    }
  }

  getPageRequest() {
    const page = this.page;
    const size = this.size;
    const sort = converSortTypeToSortArr(this.sorts);
    return new PageRequest(page, size, sort);
  }

  setSortsArr(sortsArr: string[]) {
    this.sorts = convertSortsArrToTheSortType(sortsArr, this.sortOptions);
  }

  setQueryStringValues(page: number, size: number, sortsArr: string[]) {
    this.setSortsArr(sortsArr);
    this.page = page ? +page : undefined;
    this.size = size ? +size : this.sizeDefault;
    if (this.size) {
      const val = this.sizeOptions.includes(this.size) ? this.size : null;
      this.sizeControl.setValue(val, { emitEvent: false });
    } else {
      this.sizeControl.setValue(this.sizeDefault, { emitEvent: false });
    }
  }

  cleanSorts() {
    this.sorts = {};
    this.sortsCallback();
  }

  sortChange(by: string, $event: any) {
    if ($event.ctrlKey) {
      this.removeSort(by);
    } else if ($event.shiftKey) {
      this.addSortBy(by);
    } else {
      this.setSortBy(by);
    }
    this.sortsCallback();
  }

  prevPage() {
    const page = this.page || 0;
    if (page > 0) {
      this.page = page - 1;
      this.pageCallback();
    }
  }

  nextPage() {
    const page = this.page || 0;
    this.page = page + 1;
    this.pageCallback();
  }

  buildQueryParams(filter: any) {
    const queryParams = SearchUtil.extractFilled({ ...this.getPageRequest(), ...filter });
    if (queryParams.page === 0) {
      delete queryParams.page;
    }
    if (queryParams.sort?.length === 0) {
      delete queryParams.sort;
    }
    return queryParams;
  }
}
