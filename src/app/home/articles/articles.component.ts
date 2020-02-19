import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArticlesComponent implements OnInit {
  articles: any[];
  constructor(
    private homeService: HomeService,
    private router: Router) { }

  ngOnInit(): void {
    this.articles = [1, 2, 3, 4, 5];
    // this.homeService.loadArticle().subscribe(articles => this.articles = articles.slice[5])

  }

  selectArticleHandler(articleId: string) {
    this.router.navigate(['/article', articleId]);
  }


}
