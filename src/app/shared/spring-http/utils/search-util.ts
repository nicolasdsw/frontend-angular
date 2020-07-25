import { HttpParams } from '@angular/common/http';

export class SearchUtil {
  static extractFilled(obj: any): any {
    return Object.entries(obj).reduce(
      (a, [k, v]) => (v === undefined || v === null || v === '' ? a : ((a[k] = v), a)),
      {},
    );
  }

  static convertParamsToHttpParams(...paramsArray: any[]): HttpParams {
    if (!paramsArray) {
      return null;
    }
    const paramsArrayJoin = Object.assign({}, ...paramsArray);
    const query = SearchUtil.extractFilled(paramsArrayJoin);
    return new HttpParams({ fromObject: query });
  }
}
