import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';
import { PageResponse } from '../../spring-http/model/page-response';
import { ActivatedRoute } from '@angular/router';
import { PageRequest } from '../../spring-http/model/page-request';

interface UrlParams extends PageRequest, Post {}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public posts$: Observable<PageResponse<Post>>;
  public filter = {};
  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(({ page, size, sort, ...params }) => {
      this.posts$ = this.postService.findAll(params, { page, size, sort });
    });
  }
}
