import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Osoba} from "../../../../../models/osoba.model";

@Component({
  selector: 'app-osoby-zoznam',
  templateUrl: './osoby-zoznam.component.html',
  styleUrls: ['./osoby-zoznam.component.css']
})
export class OsobyZoznamComponent implements OnInit {
  @Input()
  osoby: Osoba[] = [];

  @Output()
  editOsoba: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editOsoba.emit(id); }


  // TODO pagination
  // refreshOsoby() {
  //   this.osoby = this.osoby.map((o, i) => ({id: i + 1, ...o}))
  //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }


  constructor() { }

  ngOnInit(): void { }

}
