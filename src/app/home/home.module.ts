import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { RecentComponent } from './recent/recent.component';
import { TrendingComponent } from './trending/trending.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [ArticlesComponent, RecentComponent, TrendingComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class HomeModule { }
