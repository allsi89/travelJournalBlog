import { Component } from '@angular/core';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserPosts } from 'src/app/+store/post/actions';
import { Logout } from 'src/app/+store/auth/actions';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { Navigator } from 'src/app/core/services/navigator.service';
import { UserById } from 'src/app/+store/user/actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private navigator: Navigator
  ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  getUserPosts() {
    this.navigator.userJournal(this.authService.userData.id);
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
