import { Component } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  constructor(private oauthService: OAuthService) {
    //this.oauthService.configure(authCodeFlowConfig);
  }

  logOut(): void {
    this.oauthService.logOut();
  }

}
