import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    OsobyStrankaComponent,
    NavigationBarComponent,
    HlavnaStrankaComponent,
    OsobyZoznamComponent,
    OsobyFormularComponent,
    FooterBarComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        SweetAlert2Module.forRoot(),
        MdbCollapseModule,
        RouterModule,
        AppRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
