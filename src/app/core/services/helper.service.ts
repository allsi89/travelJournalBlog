import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { IAppState } from '../../+store';
import { Store, ActionsSubject } from '@ngrx/store';
import { IPost } from '../interfaces/post';
import { UserPosts, DeletePost, PostAuth, ActionTypes as PostActions } from '../../+store/post/actions';
import { NavService } from './nav.service';
import { ofType } from '@ngrx/effects';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private _userData;

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject,
    private navService: NavService
  ) {
    this._userData = this.authService.userData;
  }

  getUserPosts(post: IPost) {
    const user = { id: post.uid, username: post.author, email: null };

    this.store.dispatch(new UserPosts(user));
    if (this._userData.id == user.id) {
      this.navService.myJournal();
    } else {
      this.navService.userJournal();
    }
  }

  getUserPostsOfCurrent() {
    this.store.dispatch(new UserPosts(this._userData));
  }

  getCurrentUser() {
    return this._userData;
  }

  editPost() {

  }

  deletePost(post: IPost) {
    this.store.dispatch(new PostAuth(post));

    this.actionSubject.pipe(ofType(PostActions.PostAuthSuccess))
      .subscribe(() => {
        this.store.dispatch(new DeletePost(post));
      })
    this.store.dispatch(new UserPosts(this._userData));



    this.actionSubject.pipe(ofType(PostActions.GetUserPostsSuccess))
      .subscribe(() => {
        setTimeout(() => {
          this.navService.myJournal();
        }, 1000)
      })
  }
}
