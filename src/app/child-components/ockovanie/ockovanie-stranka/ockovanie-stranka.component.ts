import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Ockovanie} from "../../../../models/ockovanie.model";
import {OckovanieFormularComponent} from "../child-components/ockovanie-formular/ockovanie-formular.component";
import {OckovanieService} from "../services/ockovanie.service";
import {Osoba} from "../../../../models/osoba.model";
import {Vakcina} from "../../../../models/vakcina.model";
import {VakcinaService} from "../../vakciny/services/vakcina.service";
import {OsobyService} from "../../osoby/services/osoby.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-ockovanie-stranka',
  templateUrl: './ockovanie-stranka.component.html',
  styleUrls: ['./ockovanie-stranka.component.css']
})
export class OckovanieStrankaComponent implements OnInit {

  isLoaded: boolean = false;
  ockovania: Ockovanie[] = [];
  osoby: Osoba[] = [];
  vakciny: Vakcina[] = [];
  private sub: Subscription = new Subscription();
  ockovanie?: Ockovanie;
  @ViewChild(OckovanieFormularComponent) formular: OckovanieFormularComponent;


  constructor(private ockovanieSrv: OckovanieService, private vakcinySrv: VakcinaService, private osobySrv: OsobyService) { }

  refreshOckovanie(): void {
    this.isLoaded = false;
    this.sub.add(this.ockovanieSrv.getVaccination().subscribe(data => {
      this.ockovania = data;
      this.isLoaded = true;
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }
  refreshOsoby(): void {
    this.sub.add(this.osobySrv.getPeople().subscribe(data=>{
      this.osoby = data;
      this.isLoaded = true;
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }
  refreshVakciny(): void {
    this.sub.add(this.vakcinySrv.getVaccine().subscribe(data=>{
      this.vakciny = data;
      this.isLoaded = true;
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  // Currently only serves as confirmation to delete vaccination
  nastavOckovanie(id: number): void {
    this.sub.add(this.ockovanieSrv.getVaccinationById(id).subscribe(data => {
        Swal.fire({
          title: 'Zmaza?? o??kovanie s ID: ' + data.id,
          text: "Naozaj chcete zmaza?? vybran?? o??kovanie?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d91717',
          cancelButtonColor: '#8c8c8c',
          confirmButtonText: 'Zmaza??'
        }).then((result) => {
          if (result.isConfirmed) {
            this.zmazOckovanie(id);
          }
        })
    },
      (error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            Swal.fire("Autentifik??cia (" + error.status + ")", 'Na vykonanie danej akcie je potrebn?? sa prihlasi??.', 'error')
            break;
          case 403:
            Swal.fire("Autoriz??cia (" + error.status + ")", 'Na vykonanie danej akcie je potrebn?? by?? prihlasen?? ako administr??tor', 'error')
            break;
          default:
            Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
        }
      }));
  }

  pridajOckovanie(o: Ockovanie): void {
    this.sub.add(this.ockovanieSrv.createVaccination(o).subscribe(data => {
      Swal.fire("O??kovanie pridan??", "O??kovanie (dna: " + data.dateOfVaccination + ") bolo ??spe??ne pridan??.", "success");
      this.refreshOckovanie();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  // Not currently supported
  // upravOckovanie(o: Ockovanie): void {
  //   this.sub.add(this.ockovanieSrv.updateVaccination(o.id,o).subscribe(data => {
  //       Swal.fire("O??kovanie upraven??", "O??kovanie bolo ??spe??ne upraven??.", "success");
  //       this.refreshOckovanie();
  //   },
  //     (error: HttpErrorResponse) => {
  //       Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
  //     }));
  // }

  zmazOckovanie(id: number): void {
    this.sub.add(this.ockovanieSrv.deleteVaccination(id).subscribe(data => {
      Swal.fire("O??kovanie zmazan??", "O??kovanie bolo ??spe??ne zmazan??.", "success");
      this.refreshOckovanie();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  ngOnInit(): void {
    this.refreshOckovanie();
    this.refreshOsoby();
    this.refreshVakciny();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
