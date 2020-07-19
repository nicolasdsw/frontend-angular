import { HttpParams } from '@angular/common/http';

export class SearchUtil {
  static convertParamsToHttpParams(...paramsArray: any[]): HttpParams {
    let httpParams = new HttpParams();
    if (!paramsArray) {
      return httpParams;
    }
    paramsArray.forEach((params) => {
      httpParams = SearchUtil.convertParamsObjectToHttpParams(httpParams, params);
    });
    return httpParams;
  }

  private static convertParamsObjectToHttpParams(httpParams: HttpParams, params: {}): HttpParams {
    if (!params || !httpParams) {
      return httpParams;
    }
    Object.keys(params).forEach((key) => {
      if (typeof params[key] === 'object') {
        httpParams = httpParams.set(key, JSON.stringify(params[key]));
      } else if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    });
    return httpParams;
  }
}
