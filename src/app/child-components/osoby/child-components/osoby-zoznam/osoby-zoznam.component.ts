import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Osoba} from "../../../../../models/osoba.model";

@Component({
  selector: 'app-osoby-zoznam',
  templateUrl: './osoby-zoznam.component.html',
  styleUrls: ['./osoby-zoznam.component.css']
})
export class OsobyZoznamComponent implements OnInit, OnChanges {
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number;
  isCollapsed: boolean = true;
  @Input() isLoaded: boolean;
  @Input() osoby: Osoba[] = [];
  osobySlice: Osoba[] = [];

  @Output()
  editOsoba: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editOsoba.emit(id); }


  refreshOsoby() {
    this.osobySlice = this.osoby.map((o, i) => ({id: i + 1, ...o}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.isLoaded == true) {
      this.collectionSize = this.osoby.length;
      this.refreshOsoby();
    }
  }


}
