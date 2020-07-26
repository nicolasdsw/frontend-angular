import { FormGroup } from '@angular/forms';
import { PageRequest } from '../model/page-request';
import { ListSize } from '../model/list-size';
import { SearchUtil } from './search-util';

export class ListUtil {
  static updateFormGroup(formGroup: FormGroup, data?: { [key: string]: any }) {
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

  static updatePageSizeControl(pageRequest: PageRequest, pageSize: ListSize) {
    if (pageRequest.size) {
      const val = pageSize.options.includes(pageRequest.size) ? pageRequest.size : null;
      pageSize.control.setValue(val, { emitEvent: false });
    } else {
      pageSize.control.setValue(pageSize.default, { emitEvent: false });
    }
  }

  static buildQueryParams(pageRequest: PageRequest, filter: any) {
    const queryParams = SearchUtil.extractFilled({ ...pageRequest.toHttpParams(), ...filter });
    if (queryParams.page === 0) {
      delete queryParams.page;
    }
    if (queryParams.sort?.length === 0) {
      delete queryParams.sort;
    }
    return queryParams;
  }

  static isFormGroupUnset(formGroup: FormGroup, defaultValues: { [key: string]: any }) {
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
}
