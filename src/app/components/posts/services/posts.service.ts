import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PageRequest } from '../../spring-http/model/page-request';
import { PageResponse } from '../../spring-http/model/page-response';
import { SearchUtil } from '../../spring-http/utils/search-util';
import { CacheService } from '../../spring-http/services/cache.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private serviceUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  findAll(filter?: {}, pageRequest?: PageRequest): Observable<PageResponse<Post>> {
    const params = SearchUtil.convertParamsToHttpParams(filter, pageRequest);
    return this.cacheService.get(this.serviceUrl, { params });
  }

  findById(id: number): Observable<Post> {
    return this.cacheService.get(`${this.serviceUrl}/${id}`);
  }
}
