import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { IAppState } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { DeletePost, UserPosts, PostInfo } from 'src/app/+store/post/actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  private _userData: IUser;
  isUPostPage$: boolean;
  isAuthor$: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this._userData = this.authService.userData;
    this.isUPostPage$ = this.route.snapshot.parent.url[0].path == 'user';
    this.isAuthor$ = this.authService.userData.id == this.post.uid;
  }

  deletePost() {
    this.store.dispatch(new DeletePost(this.post));
  }

  getUserPosts(post: IPost) {
    const user = { id: post.uid, username: post.author, email: null };
    this.store.dispatch(new UserPosts(user));
  }

  getPostInfo(id: string) {
    this.store.dispatch(new PostInfo({id}));
  }
}
