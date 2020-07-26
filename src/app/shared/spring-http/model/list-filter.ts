import { FormGroup } from '@angular/forms';
import { ListUtil } from '../utils/list-util';

export class ListFilter {
  formGroup: FormGroup;
  defaultValues: { [key: string]: any };
  filter: any;
  disableClean = true;

  constructor(filtersGroup: FormGroup, filter?: any) {
    this.formGroup = filtersGroup;
    this.defaultValues = { ...filtersGroup.value };
    this.filter = filter;
    this.formGroup.valueChanges.subscribe(() => {
      this.disableClean = ListUtil.isFormGroupUnset(this.formGroup, this.defaultValues);
    });
  }

  cleanFilters() {
    ListUtil.updateFormGroup(this.formGroup, this.defaultValues);
  }

  setFilterAndUpdateFormGroup(filter: any) {
    this.filter = filter;
    ListUtil.updateFormGroup(this.formGroup, this.filter);
  }

  updateFilterWithFormGroupValues() {
    this.filter = { ...this.filter, ...this.formGroup.value };
  }
}
