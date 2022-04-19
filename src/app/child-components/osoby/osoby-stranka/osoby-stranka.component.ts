import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Osoba} from "../../../../models/osoba.model";
import {OsobyService} from "../services/osoby.service";
import {Subscription} from "rxjs";
import {OsobyFormularComponent} from "../child-components/osoby-formular/osoby-formular.component";

@Component({
  selector: 'app-osoby-stranka',
  templateUrl: './osoby-stranka.component.html',
  styleUrls: ['./osoby-stranka.component.css']
})
export class OsobyStrankaComponent implements OnInit, OnDestroy {
  osoby: Osoba[] = [];
  private sub: Subscription = new Subscription();
  isLoaded: boolean = false;
  osoba?: Osoba;
  @ViewChild(OsobyFormularComponent) formular: OsobyFormularComponent;


  constructor(private osobySrv: OsobyService) { }

  refreshOsoby(): void {
    this.isLoaded = false;
    this.sub.add(this.osobySrv.getPeople().subscribe(data => {
      this.osoby = data;
      this.isLoaded = true;
    }));
  }

  nastavOsobu(id: number): void {
    this.sub.add(this.osobySrv.getPersonById(id).subscribe(data => {
      this.osoba = data;
      this.formular.open();
    }));
  }

  pridajOsobu(o: Osoba): void {
    this.sub.add(this.osobySrv.createPerson(o).subscribe(data => {
      //todo alert
      this.refreshOsoby();
    }));
  }

  upravOsobu(o: Osoba): void {
    this.sub.add(this.osobySrv.updatePerson(o.id, o).subscribe(data => {
      //todo alert
      this.refreshOsoby();
    }));
  }

  zmazOsobu(id: number): void {
    this.sub.add(this.osobySrv.deletePerson(id).subscribe(data => {
      //todo alert
      this.refreshOsoby();
    }));
  }

  ngOnInit(): void {
    this.refreshOsoby();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
