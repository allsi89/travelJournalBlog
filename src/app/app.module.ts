import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // MDBBootstrapModule.,
    HttpClientModule,
    CoreModule,
    AppRoutingModule

  ],
  // schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
