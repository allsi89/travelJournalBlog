import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState, getIsAuthenticated } from 'src/app/+store';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
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
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })

    )
  }
} 