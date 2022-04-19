import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Ockovanie} from "../../../../models/ockovanie.model";
import {OckovanieFormularComponent} from "../child-components/ockovanie-formular/ockovanie-formular.component";
import {OckovanieService} from "../services/ockovanie.service";
import {Osoba} from "../../../../models/osoba.model";
import {Vakcina} from "../../../../models/vakcina.model";
import {VakcinaService} from "../../vakciny/services/vakcina.service";
import {OsobyService} from "../../osoby/services/osoby.service";

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
    }));
  }
  refreshOsoby(): void {
    this.sub.add(this.osobySrv.getPeople().subscribe(data=>{
      this.osoby = data;
      this.isLoaded = true;
    }));
  }
  refreshVakciny(): void {
    this.sub.add(this.vakcinySrv.getVaccine().subscribe(data=>{
      this.vakciny = data;
      this.isLoaded = true;
    }));
  }

  nastavOckovanie(id: number): void {
    this.sub.add(this.ockovanieSrv.getVaccinationById(id).subscribe(data => {
      this.ockovanie = data;
      this.formular.open();
    }));
  }

  pridajOckovanie(o: Ockovanie): void {
    this.sub.add(this.ockovanieSrv.createVaccination(o).subscribe(data => {
      //todo alert
      this.refreshOckovanie();
    }));
  }

  upravOckovanie(o: Ockovanie): void {
    this.sub.add(this.ockovanieSrv.updateVaccination(o.id,o).subscribe(data => {
      //todo alert
      this.refreshOckovanie();
    }));
  }

  zmazOckovanie(id: number): void {
    this.sub.add(this.ockovanieSrv.deleteVaccination(id).subscribe(data => {
      //todo alert
      this.refreshOckovanie();
    }));
  }

  ngOnInit(): void {
    this.refreshOckovanie();
    this.refreshOsoby();
    this.refreshVakciny();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
