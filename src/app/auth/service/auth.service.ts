import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { IAppState, getAuthUser } from 'src/app/+store';
import { IUser } from 'src/app/core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userData:IUser;
  
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private store: Store<IAppState>
  ) { 
    this.store.select(getAuthUser)
    .subscribe(user => {
      this._userData = user ? {id:user.userId, username:user.username, email:null} : null;
    }, error => console.log(error()))
  }

  /* Register user => adds username as display name in FB auth */
  registerUser(email: string, password: string, username: string) {
   return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((authData) => {
        authData.user.updateProfile({displayName: username});
        return authData.user;
      })
  }

  /* Login and calls the getUserData, returns the data from DB */
  loginUser(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(data => data.user);
  }

  logout() { this.fireAuth.signOut(); }

  get userData() {
    return this._userData;
  }
}
