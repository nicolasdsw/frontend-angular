import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListConfig } from 'src/app/shared/spring-http/model/list-config';
import { ListFilter } from 'src/app/shared/spring-http/model/list-filter';
import { PageResponse } from 'src/app/shared/spring-http/model/page-response';
import { Post } from '../model/post';
import { PostFilter } from '../model/post-filter';
import { PostsService } from '../services/posts.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  posts$: Observable<PageResponse<Post>>;
  listFilter = new ListFilter(
    new FormGroup({
      any: new FormControl(''),
      id: new FormControl(null),
      title: new FormControl(''),
      body: new FormControl(''),
    }),
  );
  listConfig = new ListConfig({
    sizeControl: new FormControl(5),
    sizeOptions: [5, 10, 50, 100],
    sortOptions: ['id', 'title', 'body'],
  });

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.listConfig.onParamsChange = () => this.updateQueryStringAndNavigate();
    this.route.queryParams.subscribe(({ page, size, sort, ...filterParams }) => {
      this.listFilter.setFilterAndUpdateFormGroup(new PostFilter(filterParams));
      this.listConfig.setQueryStringValues(+page, size, sort);
      if (page === '0' || page === '1') {
        this.listConfig.setPage(1);
      } else {
        this.loadObservable();
      }
    });
  }

  private loadObservable() {
    if (this.listFilter.formGroup.valid) {
      this.posts$ = this.postService
        .findAll(this.listFilter.filter, this.listConfig.getPageRequest())
        .pipe(tap((responsePage) => this.listConfig.validatePage(responsePage)));
    }
  }

  private updateQueryStringAndNavigate() {
    const queryParams = this.listConfig.buildQueryParams(this.listFilter.filter);
    this.router.navigate([], { queryParams });
  }

  submitFilters() {
    this.listFilter.updateFilterWithFormGroupValues();
    this.listConfig.page = 1;
    this.updateQueryStringAndNavigate();
  }
}
