import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OsobyStrankaComponent } from './child-components/osoby/osoby-stranka/osoby-stranka.component';
import {NavigationBarComponent} from "./child-components/navigation-bar/navigation-bar.component";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import { HlavnaStrankaComponent } from './child-components/hlavna/hlavna-stranka/hlavna-stranka.component';
import { OsobyZoznamComponent } from './child-components/osoby/child-components/osoby-zoznam/osoby-zoznam.component';
import { OsobyFormularComponent } from './child-components/osoby/child-components/osoby-formular/osoby-formular.component';
import { FooterBarComponent } from './child-components/footer-bar/footer-bar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { VakcinyStrankaComponent } from './child-components/vakciny/vakciny-stranka/vakciny-stranka.component';
import { VakcinaFormularComponent } from './child-components/vakciny/child-components/vakcina-formular/vakcina-formular.component';
import { VakcinaZoznamComponent } from './child-components/vakciny/child-components/vakcina-zoznam/vakcina-zoznam.component';
import {SortOsoby} from "./child-components/osoby/child-components/osoby-zoznam/sort-osoby";
import {SortVakciny} from "./child-components/vakciny/child-components/vakcina-zoznam/sort-vakciny";
import {SortOckovanie} from "./child-components/ockovanie/child-components/ockovanie-zoznam/sort-ockovanie";
import {
  OckovanieZoznamComponent
} from "./child-components/ockovanie/child-components/ockovanie-zoznam/ockovanie-zoznam.component";
import {OckovanieStrankaComponent} from "./child-components/ockovanie/ockovanie-stranka/ockovanie-stranka.component";
import {
  OckovanieFormularComponent
} from "./child-components/ockovanie/child-components/ockovanie-formular/ockovanie-formular.component";
import { TerminyStrankaComponent } from './child-components/terminy/terminy-stranka/terminy-stranka.component';
import { TerminyFormularComponent } from './child-components/terminy/child-components/terminy-formular/terminy-formular.component';
import {SortLottery} from "./child-components/hlavna/hlavna-stranka/sort-lottery";
import {AuthConfig, NullValidationHandler, OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {AuthInterceptor} from "../security/AuthInterceptor";
import { TerminyZoznamComponent } from './child-components/terminy/child-components/terminy-zoznam/terminy-zoznam.component';
import {SortTermin} from "./child-components/terminy/child-components/terminy-zoznam/sort-terminy";

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8080/auth/realms/EvidenciaApplication',
  redirectUri: 'http://localhost:4200',
  clientId: 'fe-app',
  scope: 'openid profile email',
  requireHttps: false,
  showDebugInformation: true,
};

function init_app(oauthService: OAuthService) {
  return () => configureWithNewConfigApi(oauthService);
}

function configureWithNewConfigApi(oauthService: OAuthService) {
  oauthService.configure(authCodeFlowConfig);
  oauthService.tokenValidationHandler = new NullValidationHandler();
  oauthService.setupAutomaticSilentRefresh();
  oauthService.events.subscribe(e => { });
  return oauthService.loadDiscoveryDocumentAndTryLogin();
}

@NgModule({
  declarations: [
    AppComponent,
    OsobyStrankaComponent,
    NavigationBarComponent,
    HlavnaStrankaComponent,
    OsobyZoznamComponent,
    OsobyFormularComponent,
    FooterBarComponent,
    VakcinyStrankaComponent,
    VakcinaFormularComponent,
    VakcinaZoznamComponent,
    SortOsoby,
    SortVakciny,
    SortOckovanie,
    SortLottery,
    SortTermin,
    OckovanieZoznamComponent,
    OckovanieStrankaComponent,
    OckovanieFormularComponent,
    TerminyStrankaComponent,
    TerminyFormularComponent,
    TerminyZoznamComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    MdbCollapseModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: init_app,
      deps: [
        OAuthService
      ],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
