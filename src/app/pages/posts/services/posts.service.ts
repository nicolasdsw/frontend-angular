import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { SwrService } from 'src/app/shared/spring-http/services/swr.service';
import { PageRequest } from 'src/app/shared/spring-http/model/page-request';
import { PageResponse } from 'src/app/shared/spring-http/model/page-response';
import { SearchUtil } from 'src/app/shared/spring-http/utils/search-util';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private serviceUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private swrService: SwrService) {}

  findAll(filter?: {}, pageRequest?: PageRequest): Observable<PageResponse<Post>> {
    const params = SearchUtil.convertParamsToHttpParams(filter, pageRequest);
    return this.swrService.get(this.serviceUrl, { params });
  }

  findById(id: number): Observable<Post> {
    return this.swrService.get(`${this.serviceUrl}/${id}`);
  }
}
