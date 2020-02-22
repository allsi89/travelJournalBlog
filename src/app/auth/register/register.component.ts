import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import { errorMsgs, PasswordValidator } from './custom-validation';
import { AuthService } from 'src/app/core/services/auth.service';

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
    private authService: AuthService
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
    const {email, password, username} = this.regForm.value;
    this.authService.registerUser(email, password, username);
  }
}
