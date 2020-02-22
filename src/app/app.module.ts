import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeModule } from './home/home.module';
import { PostsModule } from './post/post.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    // NgbModule,
    FlexLayoutModule,
    AuthModule,
    HomeModule,
    PostsModule,
    // AngularFireStorageModule



  ],
  schemas:[NO_ERRORS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
