import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { SpringHttpModule } from './spring-http/spring-http.module';

@NgModule({
  declarations: [SortIconComponent],
  imports: [CommonModule, FontAwesomeModule, SpringHttpModule],
  exports: [FontAwesomeModule, SpringHttpModule, SortIconComponent],
})
export class SharedModule {}
