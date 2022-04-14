import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SortEvent, SortVakcinacia} from "./sort-vakcinacia";
import {Vakcinacia} from "../../../../../models/vakcinacia.model";

const compare = (v1: String | number, v2: String | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-vakcinacia-zoznam',
  templateUrl: './vakcinacia-zoznam.component.html',
  styleUrls: ['./vakcinacia-zoznam.component.css']
})
export class VakcinaciaZoznamComponent implements OnInit {

  filtering: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  isCollapsed: boolean = true;
  @Input() isLoaded: boolean;
  @Input() vakcinacia: Vakcinacia[] = [];
  vakcinaciaSlice: Vakcinacia[] = [];
  @ViewChildren(SortVakcinacia) headers: QueryList<SortVakcinacia>;

  @Output()
  editVakcinacia: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editVakcinacia.emit(id); }

  constructor() {
    this.filtering = new FormGroup({
      id: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      vIdPerson: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      vIdVaccination: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      vFirst: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      vLast: new FormControl(null, [
        Validators.min(1),
        Validators.required
      ]),
      vType: new FormControl(null, [
        Validators.min(1),
        Validators.required
      ])
    });
  }

  // TODO ARROWS
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortableVaccination !== column) { header.direction = ''; }
    });
    if (direction === '' || column === '') { this.refreshTable(); }
    else {
      this.vakcinaciaSlice = [...this.vakcinaciaSlice].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // TODO REGEX
  refreshTable(): void {
    this.refreshOsoby();
    if(this.filtering.dirty) {
      this.vakcinaciaSlice = this.filterOut();
      this.refreshSearch();
    }
  }

  private refreshOsoby(): void {
    this.collectionSize = this.vakcinacia.length;
    this.vakcinaciaSlice = this.vakcinacia.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private refreshSearch(): void {
    this.collectionSize = this.vakcinaciaSlice.length;
    this.vakcinaciaSlice = this.vakcinaciaSlice.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private filterOut(): Vakcinacia[] {
    let filter: any;
    let filtred: Vakcinacia[] = this.vakcinacia;
    if(this.filtering.controls['id'].valid) {
      filter = this.filtering.controls['id'].value.toString();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.id.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['vIdPerson'].valid){
      filter = this.filtering.controls['vIdPerson'].value.toLocaleLowerCase();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.idPerson.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['vIdVaccination'].valid){
      filter = this.filtering.controls['vIdVaccination'].value.toLocaleLowerCase();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.idVaccine.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['vFirst'].valid) {
      filter = this.filtering.controls['vFirst'].value.toString();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.firstName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['vLast'].valid) {
      filter = this.filtering.controls['vFull'].value.toString();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.lastName.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['vType'].valid) {
      filter = this.filtering.controls['vFull'].value.toString();
      filtred = filtred.filter((vaccination: Vakcinacia) => {
        return vaccination.type.toLocaleLowerCase().match(filter);
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
