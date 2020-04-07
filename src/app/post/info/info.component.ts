import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/auth/service/auth.service';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { DeletePost, LikePost, UserPosts} from 'src/app/+store/post/actions';

@Component({
  selector: 'app-post-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  postId: string;
  post: IPost;
  private _userData: IUser;
  isAuthor$: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.data['post'];
    this._userData = this.authService.userData;
    this.isAuthor$ = this._userData.id == this.post.uid;
  }

  likePost(post) {
    if(!this.post.likes.includes(this._userData.id)) {
      this.store.dispatch(new LikePost({ post, id: this._userData.id }));
    }
  }

  deletePost(post) {
    this.store.dispatch(new DeletePost(post));
  }

  getUserPosts() {
    const user = { id: this.post.uid, username: this.post.author, email: null };
    this.store.dispatch(new UserPosts(user));
  }
}
