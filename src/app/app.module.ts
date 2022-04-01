import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OsobyStrankaComponent } from './osoby/osoby-stranka/osoby-stranka.component';
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import { HlavnaStrankaComponent } from './hlavna/hlavna-stranka/hlavna-stranka.component';

@NgModule({
  declarations: [
    AppComponent,
    OsobyStrankaComponent,
    NavigationBarComponent,
    HlavnaStrankaComponent
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
