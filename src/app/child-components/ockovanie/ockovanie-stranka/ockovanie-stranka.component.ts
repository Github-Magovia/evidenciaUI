import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Ockovanie} from "../../../../models/ockovanie.model";
import {OckovanieFormularComponent} from "../child-components/ockovanie-formular/ockovanie-formular.component";
import {OckovanieService} from "../services/ockovanie.service";

@Component({
  selector: 'app-ockovanie-stranka',
  templateUrl: './ockovanie-stranka.component.html',
  styleUrls: ['./ockovanie-stranka.component.css']
})
export class OckovanieStrankaComponent implements OnInit {

  isLoaded: boolean = false;
  ockovanie: Ockovanie[] = [];
  private sub: Subscription = new Subscription();
  ockovanie?: Ockovanie;
  @ViewChild(OckovanieFormularComponent) formular: OckovanieFormularComponent;


  constructor(private ockovanieSrv: OckovanieService) { }

  refreshOckovanie(): void {
    this.isLoaded = false;
    this.sub.add(this.ockovanieSrv.getVaccination().subscribe(data => {
      this.ockovanie = data;
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
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
