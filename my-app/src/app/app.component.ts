import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from "./common/model/article";
import { ArticlesApiService } from "./common/service/articles-api.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pubmed World';
  articles;
  

  constructor(private articlesApiService: ArticlesApiService) {

   }

  ngOnInit() {
    this.articlesApiService.getAllArticles().subscribe(data => {
      this.articles = data
    console.log(this.articles)
    })
  }
}


