import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/+store/auth/actions';
import { UserPosts } from 'src/app/+store/post/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() onToggleSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor( private store: Store<IAppState> ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }
  
  toggleSidenav() {
    this.onToggleSidenav.emit();
  }
  
  getUserPosts(){
    this.store.dispatch(new UserPosts(null));
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
