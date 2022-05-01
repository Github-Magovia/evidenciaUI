import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";
import {Termin} from "../../../../models/termin.model";
import {TerminyFormularComponent} from "../child-components/terminy-formular/terminy-formular.component";
import {TerminyService} from "../services/terminy.service";
import {OsobyService} from "../../osoby/services/osoby.service";
import {Osoba} from "../../../../models/osoba.model";

@Component({
  selector: 'app-terminy-stranka',
  templateUrl: './terminy-stranka.component.html',
  styleUrls: ['./terminy-stranka.component.css']
})
export class TerminyStrankaComponent implements OnInit {

  terminy: Termin[] = [];
  osoby: Osoba[] = [];
  private sub: Subscription = new Subscription();
  isLoaded: boolean = false;
  termin?: Termin;
  @ViewChild(TerminyFormularComponent) formular: TerminyFormularComponent;


  constructor(private terminySrv: TerminyService, private osobySrv: OsobyService) { }


  refreshOsoby(): void {
    this.sub.add(this.osobySrv.getPeople().subscribe(data=>{
        this.osoby = data;
        this.isLoaded = true;
      },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  refreshTermin(): void {
    this.isLoaded = false;
    this.sub.add(this.terminySrv.getTerms().subscribe(data => {
        this.terminy = data;
        this.isLoaded = true;
      },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  nastavTermin(id: number): void {
    this.sub.add(this.terminySrv.getTermById(id).subscribe(data => {
        this.termin = data;
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

  pridajTermin(t: Termin): void {
    this.sub.add(this.terminySrv.createTerm(t).subscribe( (data:any) => {
      Swal.fire("Rezervácia bola úspešná", "Rezervácia pre " + data.personName + "vakcínou " + data.vaccineName + "v termine " + data.dateOfVaccination + "bola úspešne pridaná.","success")
        this.refreshTermin();
      },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  upravTermin(t: Termin): void {
    this.sub.add(this.terminySrv.updateTerm(t.id, t).subscribe(data => {
        this.refreshTermin();
      },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  zmazTermin(id: number): void {
    this.sub.add(this.terminySrv.deleteTerm(id).subscribe(data => {
        Swal.fire("Osoba zmazaná", "Osoba bola úspešne zmazaná.", "success");
        this.refreshTermin();
      },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  ngOnInit(): void {
    this.refreshTermin();
    this.refreshOsoby();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
