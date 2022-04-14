import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {Vakcinacia} from "../../../../models/vakcinacia.model";
import {VakcinaciaFormularComponent} from "../child-components/vakcinacia-formular/vakcinacia-formular.component";
import {VakcinaciaService} from "../services/vakcinacia.service";

@Component({
  selector: 'app-vakcinacia-stranka',
  templateUrl: './vakcinacia-stranka.component.html',
  styleUrls: ['./vakcinacia-stranka.component.css']
})
export class VakcinaciaStrankaComponent implements OnInit {

  isLoaded: boolean = false;
  vakcinacie: Vakcinacia[] = [];
  private sub: Subscription = new Subscription();
  vakcinacia?: Vakcinacia;
  @ViewChild(VakcinaciaFormularComponent) formular: VakcinaciaFormularComponent;


  constructor(private vakcinaciaSrv: VakcinaciaService) { }

  refreshVakcinacia(): void {
    this.isLoaded = false;
    this.sub.add(this.vakcinaciaSrv.getVaccination().subscribe(data => {
      this.vakcinacie = data;
      this.isLoaded = true;
    }));
  }

  nastavVakcinaciu(id: number): void {
    this.sub.add(this.vakcinaciaSrv.getVaccinationById(id).subscribe(data => {
      this.vakcinacia = data;
      this.formular.open();
    }));
  }

  pridajVakcinaciu(v: Vakcinacia): void {
    this.sub.add(this.vakcinaciaSrv.createVaccination(v).subscribe(data => {
      //todo alert
      this.refreshVakcinacia();
    }));
  }

  upravVakcinaciu(v: Vakcinacia): void {
    this.sub.add(this.vakcinaciaSrv.updateVaccination(v.id,v).subscribe(data => {
      //todo alert
      this.refreshVakcinacia();
    }));
  }

  zmazVakcinaciu(id: number): void {
    this.sub.add(this.vakcinaciaSrv.deleteVaccination(id).subscribe(data => {
      //todo alert
      this.refreshVakcinacia();
    }));
  }

  ngOnInit(): void {
    this.refreshVakcinacia();
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

}
