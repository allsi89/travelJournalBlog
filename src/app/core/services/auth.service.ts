import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
// import { UserService } from 'src/app/core/services/user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private fireDb: AngularFirestore
    // private snackBar: MatSnackBar
  ) { }

  get isAuth() {
    return this._isAuth;
  }

  initializeAuthState() {
    this.fireAuth.authState.subscribe((userState) => {
      if (userState) {
        this._isAuth = true;
        this.isAuthChanged.next(true);
      } else {
        this._isAuth = false;
        this.isAuthChanged.next(false);
      }
    })
  }

  registerUser(email: string, password: string, username: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((authData) => {
        this.router.navigate(['/login']);
        this.createProfile(authData.user.email, authData.user.uid, username)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  loginUser(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then((userData) => {
      this.router.navigate(['/']);
      this.setLoggedInUser(userData.user.uid);
    //  const user =  this.userService.getLoggedInUser(userData);
      // localStorage.setItem('user', );
    })
    .catch((error) => {
      console.log(error)
    })

  }

  logout() {
    this.fireAuth.signOut();
    localStorage.clear();
    this.router.navigate(['/']);
  }

  createProfile(email: string, uid: string, username: string) {
    const user = {
      username: username,
      authId: uid,
      email: email
    }
    this.fireDb.collection('users').add(user)
      .then()
      .catch((error) =>
        console.log(error))
  }

  private setLoggedInUser(authId: string) {
    this.fireDb.collection<User>('users', ref => ref.where('authId', '==', authId).limit(1))
      .valueChanges()
      .subscribe((data) => {
        if (data.length > 0) {
          let user = {
            username: data[0].username,
            email: data[0].email,
            authId: data[0].authId
          }
          localStorage.setItem('user', JSON.stringify(user))
        } else {
          //TODO
        }
      })
  }

 

  method () {
    let user = this.fireAuth.currentUser;

    if(user !== null) {
      console.log(user)
    }
  }

}
