import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from '../common/service/auth/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  titre: string = "Pubmed World"
  info: any
  private roles: string[];
   authority: string;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    // this.info = {
    //   token: this.token.getToken(),
    //   username: this.token.getUsername(),
    //   authorities: this.token.getAuthorities()
    // };

    // if (this.token.getToken()) {
    //   this.roles = this.token.getAuthorities();
    //   this.roles.every(role => {
    //     if (role === 'ROLE_ADMIN') {
    //       this.authority = 'admin';
    //       return false;
    //     // } else if (role === 'ROLE_PM') {
    //     //   this.authority = 'pm';
    //     //   return false;
    //     // }
    //      } else this.authority = 'user';
    //     return true;
    //   });
    // }
  }

  // logout() {
  //   this.token.signOut();
  //   window.location.reload();
  // }

}
