import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Post } from '../model/post';
import { SwrService } from 'src/app/shared/spring-http/services/swr.service';
import { PageRequest } from 'src/app/shared/spring-http/model/page-request';
import { PageResponse } from 'src/app/shared/spring-http/model/page-response';
import { SearchUtil } from 'src/app/shared/spring-http/utils/search-util';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private serviceUrl = environment.apiUrl + 'api/posts';

  constructor(private http: HttpClient, private swrService: SwrService) {}

  findAll(filter?: {}, pageRequest?: PageRequest): Observable<PageResponse<Post>> {
    const params = SearchUtil.convertParamsToHttpParams(filter, pageRequest);
    return this.swrService.get(this.serviceUrl, { params });
  }

  findById(id: number): Observable<Post> {
    return this.swrService.get(`${this.serviceUrl}/${id}`);
  }

  insert(object: Post) {
    return this.http
      .post<number>(this.serviceUrl, object)
      .pipe(catchError((e: HttpErrorResponse) => this.handleError(e)));
  }

  update(id: number, object: Post) {
    return this.http
      .put<void>(`${this.serviceUrl}/${id}`, object)
      .pipe(catchError((e: HttpErrorResponse) => this.handleError(e)));
  }

  handleError({ error, ...e }: HttpErrorResponse) {
    if (error.status === 400 && error.errors) {
      let messages = '';
      error.errors.forEach(({ field, defaultMessage }) => {
        messages += `${field}: ${defaultMessage}\n`;
      });
      console.log(messages);
      alert(messages);
    } else {
      console.log(e.message);
      alert(JSON.stringify(error.message));
    }
    return throwError(e);
  }
}
