import { Component, OnInit, Input } from '@angular/core';
import { ListConfig } from '../../spring-http/model/list-config';
import { PageResponse } from '../../spring-http/model/page-response';

@Component({
  selector: 'app-pagination-control',
  templateUrl: './pagination-control.component.html',
  styleUrls: ['./pagination-control.component.scss'],
})
export class PaginationControlComponent implements OnInit {
  @Input()
  listConfig: ListConfig;

  @Input()
  pageResponse: PageResponse<any>;

  constructor() {}

  ngOnInit(): void {}
}
