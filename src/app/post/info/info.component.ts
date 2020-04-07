import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IAppState, getPostInfoSelector } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { DeletePost, LikePost, UserPosts, PostInfo } from 'src/app/+store/post/actions';

@Component({
  selector: 'app-post-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  post: IPost;
  private userData: IUser;
  isAuthor: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    // this.store.dispatch(new PostInfo({id}));
    this.userData = this.authService.userData;
    this.store.select(getPostInfoSelector)
    .subscribe(data => {
      this.post = data;
      this.isAuthor = this.userData.id == data.uid;
    }, err => console.error(err));
  }

  likePost() {
    this.store.dispatch(new LikePost({post: this.post, id: this.userData.id }));
  }

  deletePost(post) {
    this.store.dispatch(new DeletePost(post));
  }

  getUserPosts() {
    const user = { id: this.post.uid, username: this.post.author, email: null };
    this.store.dispatch(new UserPosts(user));
  }
}
