import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Osoba} from "../../../../models/osoba.model";
import {OsobyService} from "../services/osoby.service";
import {Subscription} from "rxjs";
import {OsobyFormularComponent} from "../child-components/osoby-formular/osoby-formular.component";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

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
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  nastavOsobu(id: number): void {
    this.sub.add(this.osobySrv.getPersonById(id).subscribe(data => {
      this.osoba = data;
      this.formular.open();
    },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            Swal.fire("Autentifikácia (" + error.status + ")", 'Na vykonanie danej akcie je potrebné sa prihlasiť.', 'error')
            break;
          case 403:
            Swal.fire("Autorizácia (" + error.status + ")", 'Na vykonanie danej akcie je potrebné byť prihlasený ako administrátor', 'error')
            break;
          default:
            Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
        }
      }));
  }

  pridajOsobu(o: Osoba): void {
    this.sub.add(this.osobySrv.createPerson(o).subscribe(data => {
      Swal.fire("Osoba pridaná", "Osoba " + data.firstName + " " + data.lastName + " bola úspešne pridaná.", "success");
      this.refreshOsoby();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  upravOsobu(o: Osoba): void {
    this.sub.add(this.osobySrv.updatePerson(o.id, o).subscribe(data => {
      Swal.fire("Osoba upravená", "Osoba " + data.firstName + " " + data.lastName + " bola úspešne upravená.", "success");
      this.refreshOsoby();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  zmazOsobu(id: number): void {
    this.sub.add(this.osobySrv.deletePerson(id).subscribe(data => {
      Swal.fire("Osoba zmazaná", "Osoba bola úspešne zmazaná.", "success");
      this.refreshOsoby();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  ngOnInit(): void {
    this.refreshOsoby();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
