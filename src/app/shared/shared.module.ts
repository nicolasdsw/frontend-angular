import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { SpringHttpModule } from './spring-http/spring-http.module';
import { PaginationControlComponent } from './components/pagination-control/pagination-control.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SortIconComponent, PaginationControlComponent],
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, SpringHttpModule],
  exports: [FontAwesomeModule, SpringHttpModule, SortIconComponent, PaginationControlComponent],
})
export class SharedModule {}
