import { Component, Output, EventEmitter } from '@angular/core';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Output() onLogout = new EventEmitter<void>();
  @Output() onGetUserPosts = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor( private store: Store<IAppState> ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  getUserPosts(){
    this.onGetUserPosts.emit();
  }

  logout() {
    this.onLogout.emit();
  }
}
