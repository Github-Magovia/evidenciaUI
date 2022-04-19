import {Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Osoba} from "../../../../../models/osoba.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SortEvent, SortOsoby} from "./sort-osoby";

const compare = (v1: String | number, v2: String | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-osoby-zoznam',
  templateUrl: './osoby-zoznam.component.html',
  styleUrls: ['./osoby-zoznam.component.css']
})
export class OsobyZoznamComponent implements OnInit, OnChanges {
  filtering: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  isCollapsed: boolean = true;
  @Input() isLoaded: boolean;
  @Input() osoby: Osoba[] = [];
  osobySlice: Osoba[] = [];
  @ViewChildren(SortOsoby) headers: QueryList<SortOsoby>;

  @Output()
  editOsoba: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editOsoba.emit(id); }

  constructor() {
    this.filtering = new FormGroup({
      id: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      fName: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      lName: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      vStatus: new FormControl(null, [
        Validators.required
      ])
    });
  }

  // TODO ARROWS
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) { header.direction = ''; }
    });

    if (direction === '' || column === '') { this.refreshTable(); }
    else {
      this.osobySlice = [...this.osobySlice].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // TODO REGEX
  refreshTable(): void {
    this.refreshOsoby();
    if(this.filtering.dirty) {
      this.osobySlice = this.filterOut();
      this.refreshSearch();
    }
  }

  checkDuration(date: string): boolean {
    if (date !== null)
      return new Date().getTime() > Date.parse(date);
    return false;
  }

  private refreshOsoby(): void {
    this.collectionSize = this.osoby.length;
    this.osobySlice = this.osoby.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private refreshSearch(): void {
    this.collectionSize = this.osobySlice.length;
    this.osobySlice = this.osobySlice.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private filterOut(): Osoba[] {
    var filter: any;
    let filtred: Osoba[] = this.osoby;
    if(this.filtering.controls['id'].valid) {
      filter = this.filtering.controls['id'].value.toString();
      filtred = filtred.filter((person: Osoba) => {
        return person.id.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['fName'].valid){
      filter = this.filtering.controls['fName'].value.toLocaleLowerCase();
      filtred = filtred.filter((person: Osoba) => {
        return person.firstName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['lName'].valid){
      filter = this.filtering.controls['lName'].value.toLocaleLowerCase();
      filtred = filtred.filter((person: Osoba) => {
        return person.lastName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['vStatus'].valid){
      filter = this.filtering.controls['vStatus'].value;
      filtred = filtred.filter((person: Osoba) => {
        return person.status.toString().match(filter);
      });
    }
    return filtred;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.isLoaded == true) { this.refreshOsoby(); }
  }
}
