import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Navigator {

  login() {
    this.router.navigate(['login']);
  }
  getPostEdit(userId: string, id: string) {
    this.router.navigate(['post/edit', userId, id]);
  }
  getPostInfo(userId: string, id: string) {
    this.router.navigate(['post/info', userId, id]);
  }
  userJournal(userId: string) {
    this.router.navigate(['user/journal', userId]);
  }
  myJournal() {
    this.router.navigate(['user/my-journal']);
  }
  postList(){
    this.router.navigate(['post/list']);
  }
  home(){
    this.router.navigate(['/']);
  }

  constructor(
    private router: Router
  ) { }


}
