import { Component, Output, EventEmitter } from '@angular/core';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserPosts } from 'src/app/+store/post/actions';
import { Logout } from 'src/app/+store/auth/actions';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  isAuth$: Observable<boolean>;

  constructor( private store: Store<IAppState> ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  getUserPosts(){
    this.store.dispatch(new UserPosts(null));
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
