import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatIconModule } from '@angular/material/icon';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NavigationComponent, FooterComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    MatIconModule,
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  exports: [NavigationComponent, FooterComponent]
})
export class CoreModule { }
