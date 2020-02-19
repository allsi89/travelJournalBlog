import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {
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
