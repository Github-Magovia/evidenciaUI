import {Component, OnInit, ViewChild} from '@angular/core';
import {Vakcina} from "../../../../models/vakcina.model";
import {Subscription} from "rxjs";
import {VakcinaFormularComponent} from "../child-components/vakcina-formular/vakcina-formular.component";
import {VakcinaService} from "../services/vakcina.service";


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
    }));
  }

  nastavVakcinu(id: number): void {
    this.sub.add(this.vakcinaSrv.getVaccineById(id).subscribe(data => {
      this.vakcina = data;
      this.formular.open();
    }));
  }

  pridajVakcinu(v: Vakcina): void {
    this.sub.add(this.vakcinaSrv.createVaccine(v).subscribe(data => {
      //todo alert
      this.refreshVakcina();
    }));
  }

  upravVakcinu(v: Vakcina): void {
    this.sub.add(this.vakcinaSrv.updateVaccine(v.id, v).subscribe(data => {
      //todo alert
      this.refreshVakcina();
    }));
  }

  zmazVakcinu(id: number): void {
    this.sub.add(this.vakcinaSrv.deleteVaccine(id).subscribe(data => {
      //todo alert
      this.refreshVakcina();
    }));
  }

  ngOnInit(): void {
    this.refreshVakcina();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}

