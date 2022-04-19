import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {DataService} from "../../../data.service";
import {CountryData} from "../../../../models/model";


@Component({
  selector: 'app-hlavna-stranka',
  templateUrl: './hlavna-stranka.component.html',
  styleUrls: ['./hlavna-stranka.component.css'],
  providers: [DatePipe]

})
export class HlavnaStrankaComponent implements OnInit {

  countries: any[];
  country:any;
  confirmed:any;
  active:any;
  death:any;
  myDate:any;
  selectedCountryData: CountryData;
  currentDate: string;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getCountry().subscribe(data=>{
      this.countries=data;
      this.country=data[0].Country;
      this.myDate=new Date();
      this.getDetails();
    })
  }
  getCountry(c:any){
    this.country=c;
    this.getDetails();
  }

  getDetails(){
    this.service.getData(this.country).subscribe(data=>{
      let index = data.length-1;
      this.confirmed=data[index].Confirmed;
      this.active=data[index].Active;
      this.death=data[index].Deaths;
    });
  }
}

