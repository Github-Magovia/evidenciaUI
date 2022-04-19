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
  recovered:any;
  death:any;
  myDate:any;
  selectedCountryData: CountryData;
  currentDate: string;

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getCountry().subscribe(data=>{
      console.log(data);
      this.countries=data;
      this.myDate=new Date();
    })
  }
  getCountry(c:any){
    console.log(c);
    this.country=c;
  }

  getDetails(){
    this.service.getData(this.country).subscribe(data=>{
      console.log(data);
      let index = data.length-1;
      this.confirmed=data[index].Confirmed;
      this.recovered=data[index].Recovered;
      this.death=data[index].Deaths;
    });
  }
}

