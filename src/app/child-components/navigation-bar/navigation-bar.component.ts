import {Component, Input} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  @Input() roles: string[] = [];

  constructor(private oauthService: OAuthService) {
    //this.oauthService.configure(authCodeFlowConfig);
  }

  logOut(): void {
    this.oauthService.logOut();
  }

  hasRole(role: string): boolean {
    for (let r of this.roles) {
      if (r.match(role)) {
        return true;
      }
    }
    return false;
  }
}
