import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './+store';
import { Logout } from './+store/auth/actions';
import { UserPosts } from './+store/post/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travelJournalBlog';

  constructor( private store: Store<IAppState> ) { }

  logout() {
    this.store.dispatch(new Logout())
  }

  getUserPosts(){
    this.store.dispatch(new UserPosts(null));
  }
}
