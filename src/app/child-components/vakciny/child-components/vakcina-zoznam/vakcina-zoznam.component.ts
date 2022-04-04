import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vakcina} from "../../../../../models/vakcina.model";

@Component({
  selector: 'app-vakcina-zoznam',
  templateUrl: './vakcina-zoznam.component.html',
  styleUrls: ['./vakcina-zoznam.component.css']
})
export class VakcinaZoznamComponent implements OnInit {

  @Input()
  vakciny: Vakcina[] = [];

  @Output()
  editVakcina: EventEmitter<number> = new EventEmitter<number>();

  edit(id: number): void { this.editVakcina.emit(id); }


  // TODO pagination
  // refreshOsoby() {
  //   this.osoby = this.osoby.map((o, i) => ({id: i + 1, ...o}))
  //     .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  // }


  constructor() { }

  ngOnInit(): void { }

}
