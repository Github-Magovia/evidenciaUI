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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { VakcinyStrankaComponent } from './child-components/vakciny/vakciny-stranka/vakciny-stranka.component';
import { VakcinaFormularComponent } from './child-components/vakciny/child-components/vakcina-formular/vakcina-formular.component';
import { VakcinaZoznamComponent } from './child-components/vakciny/child-components/vakcina-zoznam/vakcina-zoznam.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";

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
    VakcinaZoznamComponent
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
    MatGridListModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
