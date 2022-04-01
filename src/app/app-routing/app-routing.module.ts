import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HlavnaStrankaComponent} from "../hlavna/hlavna-stranka/hlavna-stranka.component";
import {OsobyStrankaComponent} from "../osoby/osoby-stranka/osoby-stranka.component";

const routes: Routes = [
  {
    path: '',
    component: HlavnaStrankaComponent
  },
  {
    path: 'osoby',
    component: OsobyStrankaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
