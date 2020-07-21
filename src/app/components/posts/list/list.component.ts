import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PageRequest } from '../../spring-http/model/page-request';
import { PageResponse } from '../../spring-http/model/page-response';
import { SearchUtil } from '../../spring-http/utils/search-util';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

interface UrlParams extends PageRequest, Post {}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public posts$: Observable<PageResponse<Post>>;
  public filtersGroup: FormGroup;
  public pageSizeControl: FormControl;
  public pageSizeOptions = [5, 10, 50, 100];

  private filter: Post;
  private pageRequest: PageRequest;
  private pageSizeDefault = 10;

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.initFormFields();
    this.route.queryParams.subscribe(({ page, size, sort, ...filterParams }) => {
      this.pageRequest = new PageRequest(page, size, sort);
      this.filter = new Post(filterParams);

      this.updatePageSizeControl(this.pageRequest);
      this.updateFilterGroup(this.filter);

      if (this.filtersGroup.valid) {
        this.posts$ = this.postService.findAll(this.filter, this.pageRequest);
      }
    });
  }

  private initFormFields() {
    this.pageSizeControl = new FormControl(this.pageSizeDefault);
    this.filtersGroup = new FormGroup({
      title: new FormControl(''),
    });
    this.pageSizeControl.valueChanges.subscribe((newVal) => {
      const newValNumber = +newVal || null;
      if (newValNumber && newValNumber !== this.pageRequest.size) {
        this.pageRequest.size = newValNumber;
        this.updateQueryStringAndNavigate();
      }
    });
  }

  private updatePageSizeControl(pageRequest: PageRequest) {
    if (pageRequest.size) {
      const val = this.pageSizeOptions.includes(pageRequest.size) ? pageRequest.size : null;
      this.pageSizeControl.setValue(val, { emitEvent: false });
    } else {
      this.pageSizeControl.setValue(this.pageSizeDefault, { emitEvent: false });
    }
  }

  private updateFilterGroup(filter: Post) {
    const formGroup = this.filtersGroup.value;
    Object.keys(formGroup).forEach(
      (key) => (formGroup[key] = filter[key] === null || filter[key] === undefined ? '' : filter[key]),
    );
    this.filtersGroup.setValue(formGroup);
  }

  private updateQueryStringAndNavigate() {
    const queryParams = SearchUtil.extractFilled({ ...this.pageRequest, ...this.filter });
    if (queryParams.page === 0) {
      delete queryParams.page;
    }
    this.router.navigate([], { queryParams });
  }
  prevPage(): void {
    this.pageRequest.prev();
    this.updateQueryStringAndNavigate();
  }
  nextPage(): void {
    this.pageRequest.next();
    this.updateQueryStringAndNavigate();
  }

  submitFilters() {
    this.filter = { ...this.filter, ...this.filtersGroup.value };
    this.pageRequest.page = 0;
    this.updateQueryStringAndNavigate();
  }
}
