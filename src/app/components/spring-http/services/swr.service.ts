import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SwrService {
  // stale while revalidate
  private cache = new Map<string, Subject<any>>();

  constructor(private http: HttpClient) {}

  get(
    url: string,
    options?: {
      params?: HttpParams;
    },
  ): Observable<any> {
    let requestCode = url;
    if (options?.params) {
      requestCode += options.params.toString();
    }
    if (!this.cache.get(requestCode)) {
      this.cache.set(requestCode, new BehaviorSubject(null));
    }
    this.http
      .get(url, options)
      .pipe(
        take(1),
        tap((res: any) => {
          this.cache.get(requestCode).next(res);
        }),
      )
      .subscribe();
    return this.cache.get(requestCode).asObservable();
  }
}
