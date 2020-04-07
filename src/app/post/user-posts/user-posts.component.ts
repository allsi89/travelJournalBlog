import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/core/interfaces/post';
import { Store } from '@ngrx/store';
import { IAppState, getUserPostsSelector, getUserByPostsSelector } from 'src/app/+store';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  postList$: Observable<IPost[]>;
  user$: IUser;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.postList$ = this.store.select(getUserPostsSelector);
    this.postList$.subscribe;
      this.store.select(getUserByPostsSelector)
          .subscribe(user => {
            if(user) {
              this.user$ = user;
            } else {
              this.user$ = this.authService.userData;
            }
          }, err => console.error(err));
    // 
  }
}
