import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Login } from 'src/app/+store/auth/actions';
import { errorMsgs } from '../register/custom-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors = errorMsgs;
  hide = true;


  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(new Login({ email, password }));
  }
}
