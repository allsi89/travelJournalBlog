import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

}
