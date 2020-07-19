import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PageRequest } from 'src/app/model/page-request';
import { PageResponse } from 'src/app/model/page-response';
import { CacheService } from 'src/app/services/cache.service';
import { Post } from '../model/post';
import { SearchUtil } from 'src/app/utils/search-util';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private serviceUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  findAll(filter?: any, pageRequest?: PageRequest): Observable<PageResponse<Post>> {
    const params = SearchUtil.convertParamsToHttpParams(filter, pageRequest);
    return this.cacheService.get(this.serviceUrl, { params });
  }

  findById(id: number): Observable<Post> {
    return this.cacheService.get(`${this.serviceUrl}/${id}`);
  }
}
