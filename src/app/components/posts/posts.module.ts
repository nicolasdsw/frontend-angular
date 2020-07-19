import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
