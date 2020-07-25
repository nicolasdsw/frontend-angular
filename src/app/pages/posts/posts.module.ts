import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule, SharedModule],
})
export class PostsModule {}
