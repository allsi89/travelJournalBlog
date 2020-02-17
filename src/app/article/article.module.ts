import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListFiveArticlesComponent } from './list-five-articles/list-five-articles.component';
import { ListTrendingComponent } from './list-trending/list-trending.component';
import { ListLatestComponent } from './list-latest/list-latest.component';



@NgModule({
  declarations: [ListFiveArticlesComponent, ListTrendingComponent, ListLatestComponent],
  imports: [
    CommonModule
  ]
})
export class ArticleModule { }
