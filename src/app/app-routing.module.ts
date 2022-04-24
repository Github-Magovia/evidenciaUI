import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HlavnaStrankaComponent} from "./child-components/hlavna/hlavna-stranka/hlavna-stranka.component";
import {OsobyStrankaComponent} from "./child-components/osoby/osoby-stranka/osoby-stranka.component";
import {VakcinyStrankaComponent} from "./child-components/vakciny/vakciny-stranka/vakciny-stranka.component";
import {OckovanieStrankaComponent} from "./child-components/ockovanie/ockovanie-stranka/ockovanie-stranka.component";
import {TerminyStrankaComponent} from "./child-components/terminy/terminy-stranka/terminy-stranka.component";

const routes: Routes = [
  {
    path: '',
    component: HlavnaStrankaComponent
  },
  {
    path: 'osoby',
    component: OsobyStrankaComponent
  },
  {
    path: 'vakciny',
    component: VakcinyStrankaComponent
  },
  {
    path: 'ockovania',
    component: OckovanieStrankaComponent
  },
  {
    path: 'terminy',
    component: TerminyStrankaComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
