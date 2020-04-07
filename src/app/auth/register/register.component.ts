import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { errorMsgs, PasswordValidator } from './custom-validation';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/+store';
import { Register } from 'src/app/+store/auth/actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  errors = errorMsgs;

  constructor(
    private fb: FormBuilder,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {

    this.regForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: [null, [Validators.required]],
    },
      {
        validators: PasswordValidator.matchPasswords
      }
    )
  }

  register() {
    this.store.dispatch(new Register(this.regForm.value));
  }
}
