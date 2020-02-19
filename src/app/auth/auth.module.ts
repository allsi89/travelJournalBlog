import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module'

import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports:[LoginComponent, RegisterComponent]
})
export class AuthModule { }
