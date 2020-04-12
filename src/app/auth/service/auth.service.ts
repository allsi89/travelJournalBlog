import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { IAppState, getAuthUserSelector } from 'src/app/+store';
import { IUser } from 'src/app/core/interfaces/user';
import { UserService } from 'src/app/user/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData: IUser;

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService,
    private store: Store<IAppState>
  ) {
    this.store.select(getAuthUserSelector)
      .subscribe(user => {
        this._userData = user ? { id: user.userId, username: user.username, email: null } : null;
      }, error => console.error(error()))
  }

  /* 
  * Register user => adds username as display name in FB auth 
  * Calls userService once res from FB Auth is received
  */
  registerUser(email: string, password: string, username: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((authData) => {
        authData.user.updateProfile({ displayName: username });
        const user = <IUser>{ username, email, id: authData.user.uid }
        return user;
      })
      .then(user => this.userService.createUserInDb(user))
  }

  /** Login user */
  loginUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(data => data.user);
  }

  /** Logout user */
  logout() { return this.fireAuth.signOut(); }

  /** Returns the current user */
  get userData() {
    return this._userData;
  }
}
