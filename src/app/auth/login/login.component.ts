import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  eventForm: FormGroup;
  hide = true;
  

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.eventForm = this.fb.group({
      username: [ null, [Validators.required]],
      password: [ null, [Validators.required]]
    });
  }
}
