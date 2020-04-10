import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/core/interfaces/post';
import { Store, ActionsSubject } from '@ngrx/store';
import { IAppState, getUserPostsSelector, getUserByPostsSelector } from 'src/app/+store';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/auth/service/auth.service';
import { ActionTypes } from 'src/app/+store/post/actions';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  postList$: Observable<IPost[]>;
  user$: IUser;
  loaded: boolean = false;

  constructor(
    private store: Store<IAppState>,
    private actionSubject: ActionsSubject,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.postList$ = this.store.select(getUserPostsSelector);
    this.postList$.subscribe;
    
    this.actionSubject.pipe(
      ofType(ActionTypes.GetUserPostsSuccess)
    ).subscribe(() => {
      this.store.select(getUserByPostsSelector)
      .subscribe(user => {
        this.user$ = user;
       
        setTimeout(() => {
          this.loaded = true;
  
        }, 1000)
      }, err => console.error(err));
    })
  }
}
