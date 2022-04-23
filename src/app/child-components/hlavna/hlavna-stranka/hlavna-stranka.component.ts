import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DatePipe} from "@angular/common";
import {DataService} from "../../../data.service";
import {CountryData} from "../../../../models/model";
import {Lottery} from "../../../../models/lottery.model";
import {FormGroup} from "@angular/forms";
import {SortEvent, SortLottery} from "./sort-lottery";
import {LotteryService} from "./services/lottery.service";


const compare = (v1: String | number, v2: String | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-hlavna-stranka',
  templateUrl: './hlavna-stranka.component.html',
  styleUrls: ['./hlavna-stranka.component.css'],
  providers: [DatePipe]

})
export class HlavnaStrankaComponent implements OnInit {

  filtering: FormGroup;
  countries: any[];
  country:any;
  confirmed:any;
  active:any;
  death:any;
  myDate:any;
  selectedCountryData: CountryData;
  currentDate: string;
  pageSize: number = 10;
  collectionSize: number;
  page: number = 1;
  isLoaded: boolean;
  lottery: Lottery[] = [];
  lotterySlice: Lottery[] = [];
  @ViewChildren(SortLottery) headers: QueryList<SortLottery>;

  constructor(private service: DataService, private lotterySrv: LotteryService) { }


  ngOnInit() {
    this.service.getCountry().subscribe(data=>{
      this.countries=data;
      this.country=data[0].Country;
      this.myDate=new Date();
      this.getDetails();
    })
    this.lotterySrv.getWinners().subscribe(data=>{
      this.lottery=data;
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
  private filterOut(): Lottery[] {
    let filter: any;
    let filtred: Lottery[] = this.lottery;
    if(this.filtering.controls['id'].valid) {
      filter = this.filtering.controls['id'].value.toString();
      filtred = filtred.filter((lottery: Lottery) => {
        return lottery.id.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['firstName'].valid){
      filter = this.filtering.controls['firstName'].value.toString().toLocaleLowerCase();
      filtred = filtred.filter((lottery: Lottery) => {
        return lottery.firstName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['lastName'].valid){
      filter = this.filtering.controls['lastName'].value.toString().toLocaleLowerCase();
      filtred = filtred.filter((lottery: Lottery) => {
        return lottery.lastName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['amount'].valid) {
      filter = this.filtering.controls['amount'].value.toString();
      filtred = filtred.filter((lottery: Lottery) => {
        return lottery.amount.toString(10).match(filter);
      });
    }
    return filtred;
  }
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortableLottery !== column) { header.direction = ''; }
    });
    if (direction === '' || column === '') { this.refreshTable(); }
    else {
      this.lotterySlice = [...this.lotterySlice].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
  refreshTable(): void {
    this.refreshWinners();
    if(this.filtering.dirty) {
      this.lotterySlice = this.filterOut();
      this.refreshSearchWinners();
    }
  }

  private refreshWinners(): void {
    this.collectionSize = this.lottery.length;
    this.lotterySlice = this.lottery.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  private refreshSearchWinners(): void {
    this.collectionSize = this.lotterySlice.length;
    this.lotterySlice = this.lotterySlice.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}

