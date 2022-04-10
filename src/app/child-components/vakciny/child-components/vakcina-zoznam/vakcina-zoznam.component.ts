import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Vakcina} from "../../../../../models/vakcina.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SortVakciny} from "./sort-vakciny";
import {SortEvent} from "./sort-vakciny";

const compare = (v1: String | number, v2: String | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-vakcina-zoznam',
  templateUrl: './vakcina-zoznam.component.html',
  styleUrls: ['./vakcina-zoznam.component.css']
})
export class VakcinaZoznamComponent implements OnInit {
  filtering: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  isCollapsed: boolean = true;
  @Input() isLoaded: boolean;
  @Input() vakciny: Vakcina[] = [];
  vakcinySlice: Vakcina[] = [];
  @ViewChildren(SortVakciny) headers: QueryList<SortVakciny>;

  @Output()
  editVakcina: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editVakcina.emit(id); }

  constructor() {
    this.filtering = new FormGroup({
      id: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      vName: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      vType: new FormControl(null, [
        Validators.minLength(1),
        Validators.required
      ]),
      vAmount: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      vFull: new FormControl(null, [
        Validators.min(1),
        Validators.required
      ])
    });
  }

  // TODO ARROWS
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortableVaccine !== column) { header.direction = ''; }
    });
    if (direction === '' || column === '') { this.refreshTable(); }
    else {
      this.vakcinySlice = [...this.vakcinySlice].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // TODO REGEX
  refreshTable(): void {
    this.refreshOsoby();
    if(this.filtering.dirty) {
      this.vakcinySlice = this.filterOut();
      this.refreshSearch();
    }
  }

  private refreshOsoby(): void {
    this.collectionSize = this.vakciny.length;
    this.vakcinySlice = this.vakciny.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private refreshSearch(): void {
    this.collectionSize = this.vakcinySlice.length;
    this.vakcinySlice = this.vakcinySlice.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private filterOut(): Vakcina[] {
    var filter: any;
    let filtred: Vakcina[] = this.vakciny;
    if(this.filtering.controls['id'].valid) {
      filter = this.filtering.controls['id'].value.toString();
      filtred = filtred.filter((vaccine: Vakcina) => {
        return vaccine.id.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['vName'].valid){
      filter = this.filtering.controls['vName'].value.toLocaleLowerCase();
      filtred = filtred.filter((vaccine: Vakcina) => {
        return vaccine.name.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['vType'].valid){
      filter = this.filtering.controls['vType'].value.toLocaleLowerCase();
      filtred = filtred.filter((vaccine: Vakcina) => {
        return vaccine.type.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['vAmount'].valid) {
      filter = this.filtering.controls['vAmount'].value.toString();
      filtred = filtred.filter((vaccine: Vakcina) => {
        return vaccine.amountOfVaccines.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['vFull'].valid) {
      filter = this.filtering.controls['vFull'].value.toString();
      filtred = filtred.filter((vaccine: Vakcina) => {
        return vaccine.amountToCompleteVaccination.toString(10).match(filter);
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
