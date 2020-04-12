import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user/service/user.service';
import { IUser } from './core/interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'travelJournalBlog';

  constructor( private router: Router,
    private userService: UserService
     ) { }

  ngOnInit(){
    // const user = <IUser> {username: 'isername', id: "myid", email: "maymail"};
    // this.userService.getUserById("Fo9et3xyzoek5JUyAcXJnIf7V8F2").subscribe(data => console.log(data))
    // this.userService.createUserInDb(user)
    // .catch(console.error);
  }
}
