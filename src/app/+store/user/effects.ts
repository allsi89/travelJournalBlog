import { UserService } from 'src/app/user/service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigator } from 'src/app/core/services/navigator.service';
import { ActionTypes, UserById, UserByIdSuccess, UserByIdFailed } from './actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
        private snackbar: MatSnackBar,
        private navigator: Navigator
    ) { }

    /** Get User By Id*/
    @Effect() userById$ = this.actions$.pipe(
        ofType<UserById>(ActionTypes.UserById),
        map(action => action.payload),
        switchMap(userId => {
            return this.userService.getUserById(userId)
                .pipe(
                    map(user => {
                        return new UserByIdSuccess(user);
                    }),
                    catchError(err => {
                        this.snackbar.open(err.message, 'Close', {
                            duration: 4000
                        });
                        this.navigator.postList();
                        return [new UserByIdFailed({error: err})];
                    })
                )
        })
    );
}