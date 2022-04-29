import {Component, OnInit, ViewChild} from '@angular/core';
import {Vakcina} from "../../../../models/vakcina.model";
import {Subscription} from "rxjs";
import {VakcinaFormularComponent} from "../child-components/vakcina-formular/vakcina-formular.component";
import {VakcinaService} from "../services/vakcina.service";
import {HttpErrorResponse} from "@angular/common/http";
import Swal from "sweetalert2";


@Component({
  selector: 'app-vakciny-stranka',
  templateUrl: './vakciny-stranka.component.html',
  styleUrls: ['./vakciny-stranka.component.css']
})
export class VakcinyStrankaComponent implements OnInit {
  isLoaded: boolean = false;
  vakciny: Vakcina[] = [];
  private sub: Subscription = new Subscription();
  vakcina?: Vakcina;
  @ViewChild(VakcinaFormularComponent) formular: VakcinaFormularComponent;


  constructor(private vakcinaSrv: VakcinaService) { }

  refreshVakcina(): void {
    this.isLoaded = false;
    this.sub.add(this.vakcinaSrv.getVaccine().subscribe(data => {
      this.vakciny = data;
      this.isLoaded = true;
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  nastavVakcinu(id: number): void {
    this.sub.add(this.vakcinaSrv.getVaccineById(id).subscribe(data => {
      this.vakcina = data;
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

  pridajVakcinu(v: Vakcina): void {
    this.sub.add(this.vakcinaSrv.createVaccine(v).subscribe(data => {
      Swal.fire("Vakcína pridaná", "Vakcína " + data.name + " (" + data.type + ") " + " bola úspešne pridaná.", "success");
      this.refreshVakcina();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  upravVakcinu(v: Vakcina): void {
    this.sub.add(this.vakcinaSrv.updateVaccine(v.id, v).subscribe(data => {
      Swal.fire("Vakcína upravená", "Vakcína " + data.name + " (" + data.type + ") " + " bola úspešne upravená.", "success");
      this.refreshVakcina();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  zmazVakcinu(id: number): void {
    this.sub.add(this.vakcinaSrv.deleteVaccine(id).subscribe(data => {
      Swal.fire("Vakcína zmazaná","Vakcína bola úspešne zmazaná.", "success");
      this.refreshVakcina();
    },
      (error: HttpErrorResponse) => {
        Swal.fire("Chyba " + error.name + " (" + error.status + ")", "Obsah chyby:<br> " + error.message, 'error')
      }));
  }

  ngOnInit(): void {
    this.refreshVakcina();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}

