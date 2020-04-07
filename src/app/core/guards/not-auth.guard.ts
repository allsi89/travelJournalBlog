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
  
  export class NotAuthGuard implements CanActivate {
    constructor(
      private snakcbar: MatSnackBar,
      private router: Router,
      private store: Store<IAppState>
    ) { }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.store.select(getIsAuthenticated).pipe(
        map(user => {
          if(user) {
              this.snakcbar.open('You are not allowed to access this URL!', 'Close', {
                  duration: 4000
              })
              this.router.navigate(['post/list'])
            return false;
          }
          return true;
        })
      )
    }
  } 