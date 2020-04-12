import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { Observable } from 'rxjs';
import { Logout } from 'src/app/+store/auth/actions';
import { UserPosts } from 'src/app/+store/post/actions';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Navigator } from 'src/app/core/services/navigator.service';
import { UserById } from 'src/app/+store/user/actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() onToggleSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private navigator: Navigator
  ) {
    this.isAuth$ = this.store.select(getIsAuthenticated);
  }

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }

  getUserPosts() {
    this.navigator.userJournal(this.authService.userData.id);
  }

  logout() {
    this.store.dispatch(new Logout())
  }
}
