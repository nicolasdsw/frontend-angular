import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public id: number;
  public post$: Observable<Post>;

  constructor(private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = +id;
      if (Number.isInteger(this.id)) {
        this.post$ = this.postService.findById(this.id);
      }
    });
  }
}
