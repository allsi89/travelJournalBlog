import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigator as NavigatorService } from 'src/app/core/services/navigator.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private navigator: NavigatorService,
    private snakcbar: MatSnackBar,
    private store: Store<IAppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(getIsAuthenticated).pipe(
      map(user => {
        if (!user) {
          this.snakcbar.open('You are not allowed to access this URL!', 'Close', {
            duration: 4000
          })
          this.navigator.login()
          return false;
        }
        return true;
      })

    )
  }
} 