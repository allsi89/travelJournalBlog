import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState, getUserPostsSelector, getRequestedUserSelector } from 'src/app/+store';
import { ActionTypes as PostActions, UserPosts } from 'src/app/+store/post/actions';
import { ActionTypes as UserActions } from 'src/app/+store/user/actions';
import { ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { UserById } from 'src/app/+store/user/actions';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  postList: IPost[];
  loaded: boolean = false;
  title: string = null;

  constructor(
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.store.dispatch(new UserPosts(userId))
    this.store.dispatch(new UserById(userId));
    this.store.select(getUserPostsSelector)
      .subscribe(posts => {
        if (posts) {
          this.postList = posts;
        }
      });

    this.setTitle();
    this.setLoaded();
  }

  setTitle() {
    this.actionSubject.pipe(
      ofType(UserActions.UserByIdSuccess)
    ).subscribe(() => {
      this.store.select(getRequestedUserSelector)
        .subscribe(user => {
          this.title = `${user.username}'s journal`;
        })
    });
  }

  setLoaded() {
    this.actionSubject.pipe(
      ofType(PostActions.GetUserPostsSuccess)
    ).subscribe(() => {
      setTimeout(() => {
        this.loaded = true;
      }, 1000)
    });
  }
}
