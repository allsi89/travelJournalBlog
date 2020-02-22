import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {

  isAuth: boolean = false;
  isAuthSub: Subscription;
 
  constructor(
    private authService: AuthService,
    
  ) { }

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    })
  }

  ngOnDestroy() {
    this.isAuthSub.unsubscribe();
  }

  logout() {
    this.authService.logout()
  }
}
