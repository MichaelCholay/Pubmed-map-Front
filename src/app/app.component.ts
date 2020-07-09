import { Component, OnInit } from '@angular/core';
import { ArticlesApiService } from "./common/service/articles-api.service";
import { GeolocService } from './common/service/geoloc.service';
import { TokenStorageService } from './common/service/auth/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  info: any
  title = 'Pubmed World';
  articles = [];
  private roles: string[];
   authority: string;


  constructor(private token: TokenStorageService, private articlesApiService: ArticlesApiService) {

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }

    this.articlesApiService.getAllArticles().subscribe(data => {
      this.articles = data
    })
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

 

}


