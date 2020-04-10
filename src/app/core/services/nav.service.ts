import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  getPostEdit(id: string) {
    this.router.navigate(['post/edit', id]);
  }
  getPostInfo(id: string) {
    this.router.navigate(['post/info', id]);
  }
  userJournal() {
    this.router.navigate(['user/journal']);
  }
  myJournal() {
    this.router.navigate(['user/my-journal']);
  }

  constructor(
    private router: Router
  ) { }


}
