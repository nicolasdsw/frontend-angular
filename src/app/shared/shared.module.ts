import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';
import { SpringHttpModule } from './spring-http/spring-http.module';

@NgModule({
  declarations: [SortIconComponent],
  imports: [CommonModule],
  exports: [SpringHttpModule, SortIconComponent],
})
export class SharedModule {}
