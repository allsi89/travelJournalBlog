import { Component, OnInit, Input } from '@angular/core';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { Navigator } from 'src/app/core/services/navigator.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { DeletePost } from 'src/app/+store/post/actions';
import { DeleteFile } from 'src/app/+store/upload/actions';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() post: IPost;
  private _userData: IUser;
  isUPostPage$: boolean;
  isAuthor$: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private navigator: Navigator,
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this._userData = this.authService.userData;
    this.isUPostPage$ = this.route.snapshot.parent.url[0].path == 'user';
    if(this._userData) {
      this.isAuthor$ = this._userData.id == this.post.uid;
    }
  }

  deletePost() {
    this.store.dispatch(new DeletePost(this.post));
    this.store.dispatch(new DeleteFile(this.post.imgUrl));
  }

  getUserPosts(uid: string) {
    this.navigator.userJournal(uid);
  }

  getPostInfo(userId: string, id: string) {
    this.navigator.getPostInfo(userId, id);
  }

  getEditPost(userId: string, id: string) {
    this.navigator.getPostEdit(userId, id);
  }
}
