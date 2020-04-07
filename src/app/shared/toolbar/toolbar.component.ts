import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() onToggleSidenav = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();
  @Output() onGetUserPosts = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor( private store: Store<IAppState> ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  logout() {
    this.onLogout.emit();
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }

  getUserPosts(){
    this.onGetUserPosts.emit();
  }
}
