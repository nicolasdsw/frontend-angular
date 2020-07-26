import { ListSize } from './list-size';
import { PageRequest } from './page-request';

export class ListConfig {
  pageRequest: PageRequest;
  listSize: ListSize;
  sortOptions: string[];
}
