import {Component, OnDestroy, OnInit} from '@angular/core';
import {Osoba} from "../../../../models/osoba.model";
import {OsobyService} from "../services/osoby.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-osoby-stranka',
  templateUrl: './osoby-stranka.component.html',
  styleUrls: ['./osoby-stranka.component.css']
})
export class OsobyStrankaComponent implements OnInit, OnDestroy {
  osoby: Osoba[] = [{id: 0, firstName: "John", lastName: "Doe", dateOfBirth: new Date().toDateString(), sex: "M"},
    {id: 1, firstName: "Lom", lastName: "Doe", dateOfBirth: new Date().toDateString(), sex: "M"},
    {id: 2, firstName: "Kom", lastName: "Doe", dateOfBirth: new Date().toDateString(), sex: "M"}];
  private sub: Subscription = new Subscription();
  osoba?: Osoba;


  constructor(private osobySrv: OsobyService) { }

  refreshOsoby(): void {
    this.sub.add(this.osobySrv.getAllPeople().subscribe(data => {
      this.osoby = data;
    }));
  }

  nastavOsobu(id: number): void {
    this.sub.add(this.osobySrv.getPersonById(id).subscribe(data => {
      this.osoba = data;
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
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
