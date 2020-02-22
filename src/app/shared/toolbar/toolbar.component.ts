import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() onToggleSidenav = new EventEmitter<void>();
  isAuth: boolean = false;
  isAuthSub: Subscription;

  constructor(
    private authService: AuthService
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

  toggleSidenav() {
    this.onToggleSidenav.emit();
  }
}
