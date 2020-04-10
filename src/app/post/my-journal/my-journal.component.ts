import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/core/interfaces/post';
import { IUser } from 'src/app/core/interfaces/user';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState, getUserPostsSelector } from 'src/app/+store';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ofType } from '@ngrx/effects';
import { ActionTypes as PostActions, UserPosts} from 'src/app/+store/post/actions';
import { HelperService } from 'src/app/core/services/helper.service';

@Component({
  selector: 'app-my-journal',
  templateUrl: './my-journal.component.html',
  styleUrls: ['./my-journal.component.scss']
})
export class MyJournalComponent implements OnInit {
  postList$: Observable<IPost[]>;
  user: IUser;
  loaded: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject,
    private helper: HelperService
  ) { }

  ngOnInit(): void {
    this.user = this.helper.getCurrentUser();
    this.store.dispatch(new UserPosts(this.user));

    this.postList$ = this.store.select(getUserPostsSelector);
    this.postList$.subscribe;

    this.actionSubject.pipe(
      ofType(PostActions.GetUserPostsSuccess)
    ).subscribe(() => {
      setTimeout(() => {
        this.loaded = true;

      }, 1000)
    })
  }
}
