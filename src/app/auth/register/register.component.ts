import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { errorMsgs, PasswordValidator } from './custom-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  errors = errorMsgs;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.regForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    },
      {
        validators: PasswordValidator.matchPasswords
      }
    )
  }
}
