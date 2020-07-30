import { FormGroup } from '@angular/forms';

function isFormGroupUnset(formGroup: FormGroup, defaultValues: { [key: string]: any }) {
  if (!formGroup) {
    return true;
  }
  const filterKeys = Object.keys(defaultValues);
  for (const key of filterKeys) {
    if (defaultValues[key] !== formGroup.get(key)?.value) {
      return false;
    }
  }
  return true;
}

function updateFormGroup(formGroup: FormGroup, data?: { [key: string]: any }) {
  if (!data) {
    data = {};
  }
  const formGroupValue = formGroup.value;
  Object.keys(formGroupValue).forEach((key) => {
    if (formGroupValue[key] instanceof String || typeof formGroupValue[key] === 'string') {
      formGroupValue[key] = data[key] === undefined || data[key] === null ? '' : data[key];
    } else if (typeof formGroupValue[key] === 'boolean') {
      formGroupValue[key] = data[key] || false;
    } else {
      formGroupValue[key] = data[key] === undefined ? null : data[key];
    }
  });
  formGroup.setValue(formGroupValue);
}

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
      this.disableClean = isFormGroupUnset(this.formGroup, this.defaultValues);
    });
  }

  cleanFilters() {
    updateFormGroup(this.formGroup, this.defaultValues);
  }

  setFilterAndUpdateFormGroup(filter: any) {
    this.filter = filter;
    updateFormGroup(this.formGroup, this.filter);
  }

  updateFilterWithFormGroupValues() {
    this.filter = { ...this.filter, ...this.formGroup.value };
  }
}
