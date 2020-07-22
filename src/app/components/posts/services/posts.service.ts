import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PageRequest } from '../../spring-http/model/page-request';
import { PageResponse } from '../../spring-http/model/page-response';
import { SearchUtil } from '../../spring-http/utils/search-util';
import { SwrService } from '../../spring-http/services/swr.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private serviceUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient, private swrService: SwrService) {}

  findAll(filter?: {}, pageRequest?: PageRequest): Observable<PageResponse<Post>> {
    const pageReq = pageRequest.toHttpParams();
    const params = SearchUtil.convertParamsToHttpParams(filter, pageReq);
    return this.swrService.get(this.serviceUrl, { params });
  }

  findById(id: number): Observable<Post> {
    return this.swrService.get(`${this.serviceUrl}/${id}`);
  }
}
