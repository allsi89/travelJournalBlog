import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { IAppState, getPostInfoSelector } from 'src/app/+store';
import { Store, ActionsSubject } from '@ngrx/store';
import { PostInfo, ActionTypes, DeletePost, LikePost } from 'src/app/+store/post/actions';
import { Navigator } from 'src/app/core/services/navigator.service';
import { ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IUser } from 'src/app/core/interfaces/user';
import { DeleteFile } from 'src/app/+store/upload/actions';

@Component({
  selector: 'app-post-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  post: IPost;
  loaded: boolean = false;
  userData: IUser;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject,
    private authService: AuthService,
    private navigator: Navigator
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const userId = this.route.snapshot.paramMap.get('userId');
    this.store.dispatch(new PostInfo({ userId, id }));
    this.userData = this.authService.userData;
    this.actionSubject.pipe(
      ofType(ActionTypes.PostInfoSuccess)
    ).subscribe(() => {
      this.store.select(getPostInfoSelector).subscribe(data => {
        this.post = data;
        this.loaded = true;
      })
    })
  }

  deletePost() {
    this.store.dispatch(new DeletePost(this.post));
    this.loading = true;
    this.actionSubject.pipe(ofType(ActionTypes.DeletePostSuccess))
    .subscribe(() => {
      this.store.dispatch(new DeleteFile(this.post.imgUrl));
      this.navigator.userJournal(this.userData.id);
    })
  }

  getUserPosts() {
    this.navigator.userJournal(this.post.uid)
  }

  getPostInfo(userId: string, id: string) {
    this.navigator.getPostInfo(userId, id);
  }

  getEditPost(userId: string, id: string) {
    this.navigator.getPostEdit(userId, id);
  }

  likePost() {
    this.store.dispatch(new LikePost({ post: this.post, id: this.userData.id }));
  }
}
