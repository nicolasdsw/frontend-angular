import { HttpParams } from '@angular/common/http';

const val = {};
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
    const params = SearchUtil.extractFilled(paramsArrayJoin);
    const httpParams = new HttpParams({ fromObject: params });
    return httpParams;
  }
}
