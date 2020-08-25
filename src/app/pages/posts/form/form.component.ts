import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../model/post';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public mode: 'add' | 'edit';
  public post$: Observable<Post>;
  public formGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });
  private object: Post;
  private emptyObject: Post = { title: '', body: '', id: null, userId: null };

  constructor(private router: Router, private route: ActivatedRoute, private postService: PostsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      let loadSub: Observable<Post> = null;
      if (id === 'add') {
        this.mode = 'add';
        loadSub = of({ ...this.emptyObject });
      } else if (Number.isInteger(+id)) {
        this.mode = 'edit';
        loadSub = this.postService.findById(+id);
      } else {
        this.goToList();
      }
      this.post$ = loadSub?.pipe(
        map((post) => {
          if (post) {
            this.object = post;
            this.formGroup.setValue({
              title: post.title,
              body: post.body,
            });
          }
          return post;
        }),
      );
    });
  }

  submit() {
    const save = {
      add: (object: Post) => {
        this.postService.insert(object).subscribe((id) => {
          alert(`${id} Cadastrado com sucesso`);
          this.router.navigate(['../', id], { relativeTo: this.route });
        });
      },
      edit: (object: Post) => {
        this.postService.update(object.id, object).subscribe(() => {
          alert('Salvo com sucesso');
        });
      },
    };
    const { title, body } = this.formGroup.value;
    const objectToSend = { ...this.object, title, body };
    save[this.mode](objectToSend);
  }

  goToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
