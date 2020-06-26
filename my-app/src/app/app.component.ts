import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from "./common/service/articles-api.service";
import { GeolocService } from './common/service/geoloc.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Pubmed World';
  articles;
  geoloc = []
  

  constructor(private articlesApiService: ArticlesApiService, private geolocService: GeolocService) {

   }

  ngOnInit() {
    // this.articlesApiService.getAllArticles().subscribe(data => {
    //   this.articles = data
    // console.log(this.articles)
    // })

    this.geolocService.getAllGeoloc().subscribe(data => {
      this.geoloc = data
    })
  }
}


