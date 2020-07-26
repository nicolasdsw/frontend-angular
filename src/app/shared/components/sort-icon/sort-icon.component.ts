import { Component, OnInit, Input } from '@angular/core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sort-icon',
  templateUrl: './sort-icon.component.html',
  styleUrls: ['./sort-icon.component.scss'],
})
export class SortIconComponent implements OnInit {
  @Input()
  sortDir: 'asc' | 'desc';
  arrowUp = faArrowUp;
  arrowDown = faArrowDown;

  constructor() {}

  ngOnInit(): void {}
}
