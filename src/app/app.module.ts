import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OsobyStrankaComponent } from './osoby/osoby-stranka/osoby-stranka.component';

@NgModule({
  declarations: [
    AppComponent,
    OsobyStrankaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
