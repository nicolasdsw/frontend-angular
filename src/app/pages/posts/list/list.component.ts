import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageRequest } from 'src/app/shared/spring-http/model/page-request';
import { PageResponse } from 'src/app/shared/spring-http/model/page-response';
import { ListUtil } from 'src/app/shared/spring-http/utils/list-util';
import { Post } from '../model/post';
import { PostFilter } from '../model/post-filter';
import { PostsService } from '../services/posts.service';
import { ListSize } from 'src/app/shared/spring-http/model/list-size';
import { ListFilter } from 'src/app/shared/spring-http/model/list-filter';
import { ListConfig } from 'src/app/shared/spring-http/model/list-config';

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
  listConfig: ListConfig = {
    listSize: new ListSize(new FormControl(10), [5, 10, 50, 100]),
    sortOptions: ['id', 'title', 'body'],
    pageRequest: new PageRequest(),
  };

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.listConfig.listSize.control.valueChanges.subscribe((newVal) => this.pageSizeChange(newVal));

    this.route.queryParams.subscribe(({ page, size, sort, ...filterParams }) => {
      this.listConfig.pageRequest = PageRequest.of(page, size, sort, this.listConfig.sortOptions);
      this.listFilter.setFilterAndUpdateFormGroup(new PostFilter(filterParams));
      ListUtil.updatePageSizeControl(this.listConfig.pageRequest, this.listConfig.listSize);
      this.loadData();
    });
  }

  private loadData() {
    if (this.listFilter.formGroup.valid) {
      this.posts$ = this.postService.findAll(this.listFilter.filter, this.listConfig.pageRequest);
    }
  }

  private updateQueryStringAndNavigate() {
    const queryParams = ListUtil.buildQueryParams(this.listConfig.pageRequest, this.listFilter.filter);
    this.router.navigate([], { queryParams });
  }

  private pageSizeChange(newVal: any) {
    const newValNumber = +newVal || null;
    if (newValNumber && newValNumber !== this.listConfig.pageRequest.size) {
      this.listConfig.pageRequest.size = newValNumber;
      this.updateQueryStringAndNavigate();
    }
  }

  submitFilters() {
    this.listFilter.updateFilterWithFormGroupValues();
    this.listConfig.pageRequest.page = 0;
    this.updateQueryStringAndNavigate();
  }

  prevPage(): void {
    this.listConfig.pageRequest.prev();
    this.updateQueryStringAndNavigate();
  }

  nextPage(): void {
    this.listConfig.pageRequest.next();
    this.updateQueryStringAndNavigate();
  }

  sortChange(by: string, $event: any) {
    this.listConfig.pageRequest.sortChange(by, $event);
    this.updateQueryStringAndNavigate();
  }
}
