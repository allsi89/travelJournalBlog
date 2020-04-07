import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IAppState, getAllPostsSelector } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { AllPosts, UserPosts } from 'src/app/+store/post/actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  postList$: Observable<IPost[]>;
  buttonName: string = 'Table View';
  cardView: boolean = true;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new AllPosts());
    this.postList$ = this.store.select(getAllPostsSelector);
    this.postList$.subscribe;
  }

  getUserPosts(post: IPost) {
    const user = { id: post.uid, username: post.author, email: null };
    this.store.dispatch(new UserPosts(user));
  }

  toggle() {
    this.cardView = !this.cardView;
    if (this.cardView) {
      this.buttonName = 'Table View';
    } else {
      this.buttonName = 'Default View';
    }
  }
}
