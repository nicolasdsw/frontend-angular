import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';
import { PageResponse } from 'src/app/model/page-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public posts$: Observable<PageResponse<Post>>;

  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.findAll();
  }
}
