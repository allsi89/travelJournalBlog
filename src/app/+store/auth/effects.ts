import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ActionTypes,
  Register, RegisterSuccess, RegisterFailed,
  Login, LoginSuccess, LoginFailed,
  Logout, LogoutSuccess, LogoutFailed,
  SetUser
} from './actions';
import { AuthService } from 'src/app/auth/service/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigator } from 'src/app/core/services/navigator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private navigator: Navigator
  ) { }

  /** Register */
  @Effect() register$ = this.actions$.pipe(
    ofType<Register>(ActionTypes.Register),
    map(action => action.payload),
    switchMap(({ email, password, username }) => {
      return this.authService.registerUser(email, password, username)
        .then(() => {
          this.snackbar.open('Successful registration!', 'Close', {
            duration: 3000
          });
          this.navigator.login();
          return new RegisterSuccess();
        })
        .catch(err => {
          this.snackbar.open(err.message, 'Close', {
            duration: 3000
          });
          return new RegisterFailed(err);
        })
    })
  );

  /** Login */
  @Effect() login$ = this.actions$.pipe(
    ofType<Login>(ActionTypes.Login),
    map(action => action.payload),
    switchMap(({ email, password }) => {
      return this.authService.loginUser(email, password)
        .then(userData => {
          this.navigator.postList();
          const user = { userId: userData.uid, username: userData.displayName };
          localStorage.setItem('user', JSON.stringify(user));
          return new LoginSuccess(user);
        })
        .catch(err => {
          this.snackbar.open(err.message, 'Close', {
            duration: 3000
          });
          return new LoginFailed(err);
        })
    })
  );

  /** Logout */
  @Effect() logout$ = this.actions$.pipe(
    ofType<Logout>(ActionTypes.Logout),
    switchMap(() => {
      return this.authService.logout()
      .then(() => {
        localStorage.clear();
        this.navigator.home();
        return new LogoutSuccess();
      }).catch(err => {
        this.snackbar.open(err.message, 'Close', {
          duration: 3000
        });
        return new LogoutFailed(err);
      })
    })
  );

  /** Init state, logged in user in LS */
  @Effect() init$ = this.actions$.pipe(
    ofType('@ngrx/effects/init'),
    switchMap(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) { return []; }
      return [new SetUser(user)];
    })
  );
}
