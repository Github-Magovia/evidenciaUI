import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";
import {DataService} from "../../../data.service";
import {SummaryData, CountryData} from "../../../../models/model";


@Component({
  selector: 'app-hlavna-stranka',
  templateUrl: './hlavna-stranka.component.html',
  styleUrls: ['./hlavna-stranka.component.css'],
  providers: [DatePipe]

})
export class HlavnaStrankaComponent implements OnInit {

  summaryData: SummaryData;
  slovakiaData: CountryData;
  selectedCountryData: CountryData;
  highlyConfirmedData: Array<CountryData>;
  highlyDeathData: Array<CountryData>;
  highlyRecoveredData: Array<CountryData>;
  currentDate: string;

  constructor(private service: DataService, private datePipe: DatePipe) { }

  ngOnInit() {
    let date = new Date();
    this.currentDate = this.datePipe.transform(date,'d.M.Y');
    this.getAllData();
  }

  getAllData() {
    this.service.getData().subscribe(
      response => {
        this.summaryData = response;
        this.getSlovakiaData();
        this.getSortedData();
      }
    )
  }
  getSlovakiaData() {
    this.slovakiaData = this.summaryData.Countries.find(x => x.Slug == "slovakia");
  }

  getSortedData() {
    let data = JSON.parse(JSON.stringify(this.summaryData.Countries));
    this.highlyConfirmedData = data.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed).slice(0, 10);
    this.highlyDeathData = data.sort((a, b) => b.TotalDeaths - a.TotalDeaths).slice(0, 10);
    this.highlyRecoveredData = data.sort((a, b) => b.TotalRecovered - a.TotalRecovered).slice(0, 10);
  }
}
