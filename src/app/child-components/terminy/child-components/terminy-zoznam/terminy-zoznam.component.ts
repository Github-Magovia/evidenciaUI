import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Termin} from "../../../../../models/termin.model";
import {SortEvent, SortTermin} from "./sort-terminy";


const compare = (v1: String | number, v2: String | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-terminy-zoznam',
  templateUrl: './terminy-zoznam.component.html',
  styleUrls: ['./terminy-zoznam.component.css']
})
export class TerminyZoznamComponent implements OnInit {

  filtering: FormGroup;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  isCollapsed: boolean = true;
  @Input() isLoaded: boolean;
  @Input() terminy: Termin[] = [];
  terminySlice: Termin[] = [];
  @ViewChildren(SortTermin) headers: QueryList<SortTermin>;

  @Output()
  editTermin: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editTermin.emit(id); }

  constructor() {
    this.filtering = new FormGroup({
      id: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ]),
      tpersonId: new FormControl(null, [
        Validators.min(1),
        Validators.required
      ]),
      tVaccinationCentre: new FormControl(null, [
        Validators.min(1),
        Validators.required
      ]),
      tDateOfVaccination: new FormControl(null, [
        Validators.min(0),
        Validators.required
      ])
    });
  }

  // TODO ARROWS
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortableTerm !== column) { header.direction = ''; }
    });
    if (direction === '' || column === '') { this.refreshTable(); }
    else {
      this.terminySlice = [...this.terminySlice].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  // TODO REGEX
  refreshTable(): void {
    this.refreshTerminy();
    if(this.filtering.dirty) {
      this.terminySlice = this.filterOut();
      this.refreshSearch();
    }
  }

  private refreshTerminy(): void {
    this.collectionSize = this.terminy.length;
    this.terminySlice = this.terminy.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private refreshSearch(): void {
    this.collectionSize = this.terminySlice.length;
    this.terminySlice = this.terminySlice.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  private filterOut(): Termin[] {
    let filter: any;
    let filtred: Termin[] = this.terminy;
    if(this.filtering.controls['id'].valid) {
      filter = this.filtering.controls['id'].value.toString();
      filtred = filtred.filter((term: Termin) => {
        return term.id.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['tpersonId'].valid){
      filter = this.filtering.controls['tpersonId'].value.toString();
      filtred = filtred.filter((term: Termin) => {
        return term.personId.toString(10).match(filter);
      });
    }
    if(this.filtering.controls['tVaccinationCentre'].valid){
      filter = this.filtering.controls['tVaccinationCentre'].value.toString();
      filtred = filtred.filter((term: Termin) => {
        return term.vaccinationCentre.toLocaleLowerCase().match(filter);
      });
    }
    if(this.filtering.controls['tDateOfVaccination'].valid) {
      filter = this.filtering.controls['tDateOfVaccination'].value.toString();
      filtred = filtred.filter((term: Termin) => {
        return term.dateOfVaccination.toLocaleLowerCase().match(filter);
      });
    }
    return filtred;
  }

  @Output()
  removeTermin: EventEmitter<number> = new EventEmitter<number>();

  remove(id: number): void{
    this.removeTermin.emit(id);
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.isLoaded == true) { this.refreshTerminy(); }
  }
}
