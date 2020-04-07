import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, Register, RegisterSuccess, Login, LoginSuccess, LoginFailed, Logout, LogoutSuccess, LogoutFailed, RegisterFailed, SetUser } from './actions';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  /** Login */
  @Effect() login$ = this.actions$.pipe(
    ofType<Login>(ActionTypes.Login),
    map(action => action.payload),
    switchMap(({ email, password }) => {
      return this.authService
        .loginUser(email, password)
        .then(userData => {
          this.router.navigate(['post/list']);
          const user =  {userId: userData.uid, username: userData.displayName};
          localStorage.setItem('user', JSON.stringify(user));
          return new LoginSuccess(user);
        })
        .catch(error => {
          this.snackbar.open(error.message, 'Undo', {
            duration: 3000
          });
          return new LoginFailed(error);
        })
    })
  );

  /** Logout */
  @Effect() logout$ = this.actions$.pipe(
    ofType<Logout>(ActionTypes.Logout),
    switchMap(async () => {
      try {
        this.authService
          .logout();
        localStorage.clear();
        this.router.navigate(['/']);
        return new LogoutSuccess();
      }
      catch (error) {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
        return new LogoutFailed(error);
      }
    })
  );

  /** Register */
  @Effect() register$ = this.actions$.pipe(
    ofType<Register>(ActionTypes.Register),
    map(action => action.payload),
    switchMap(({ email, password, username }) => {
      return this.authService.registerUser(email, password, username)
        .then(data => {
          this.router.navigate(['/login'])
          return new RegisterSuccess()
        })
        .catch(error => {
          this.snackbar.open(error.message, 'Undo', {
            duration: 3000
          });
          return new RegisterFailed(error);
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
