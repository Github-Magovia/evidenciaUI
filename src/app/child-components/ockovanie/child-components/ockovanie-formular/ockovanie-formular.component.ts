import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Ockovanie} from "../../../../../models/ockovanie.model";
import {Osoba} from "../../../../../models/osoba.model";
import {Vakcina} from "../../../../../models/vakcina.model";

@Component({
  selector: 'app-ockovanie-formular',
  templateUrl: './ockovanie-formular.component.html',
  styleUrls: ['./ockovanie-formular.component.css']
})
export class OckovanieFormularComponent implements OnInit {
  @Input() osoby: Osoba[];
  @Input() vakciny: Vakcina[];
  ockovanieForm: FormGroup;
  @ViewChild('content', { static: true }) modal: ElementRef;
  showAlert: boolean;
  @Input()
  set ockovanie(data: Ockovanie) {
    if (data) { this.naplnFormular(data); }
  }
  @Output()
  createOckovanie: EventEmitter<Ockovanie>;
  @Output()
  editOckovanie: EventEmitter<Ockovanie>;
  @Output()
  deleteOckovanie: EventEmitter<number>;

  //TODO Fix Date with backend
  constructor(private modalService: NgbModal) {
    this.showAlert = false;
    this.createOckovanie = new EventEmitter<Ockovanie>();
    this.editOckovanie = new EventEmitter<Ockovanie>();
    this.deleteOckovanie = new EventEmitter<number>();
    this.ockovanieForm = new FormGroup({
      id: new FormControl(null),
      idPerson: new FormControl(null, [
        Validators.required
      ]),
      idVaccine: new FormControl(null, [
        Validators.required
      ]),
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  private naplnFormular(o: Ockovanie): void {
    this.ockovanieForm.controls['id'].setValue(o.id);
    this.ockovanieForm.controls['idPerson'].setValue(o.idPerson);
    this.ockovanieForm.controls['idVaccine'].setValue(o.idVaccine);
    this.ockovanieForm.controls['firstName'].setValue(o.firstName);
    this.ockovanieForm.controls['lastName'].setValue(o.lastName);
    this.ockovanieForm.controls['type'].setValue(o.type);
  }

  open() {
    this.modalService.open(this.modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((reason) => {
      this.spracuj(reason);
    }, (reason) => {
      this.spracuj(reason);
    });
  }

  private spracuj(reason: any): void {
    if (reason === "add") {
      this.createOckovanie.emit({
        idPerson: this.ockovanieForm.value.idPerson,
        idVaccine: this.ockovanieForm.value.idVaccine
      });
      this.toggleAlert(false);
    } else if (reason === "edit") {
      this.uprav();
      this.toggleAlert(false);
    } else if (reason === "delete") {
      this.zmaz();
    } else {
      this.toggleAlert(true);
    }
    this.zastavUpravu();
  }

  public uprav(): void{
    this.editOckovanie.emit(this.ockovanieForm.value);
    this.ockovanieForm.reset();
  }

  public zastavUpravu(): void {
    this.ockovanie = undefined;
    this.ockovanieForm.reset();
  }

  public zmaz(): void {
    this.deleteOckovanie.emit(this.ockovanieForm.value.id);
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  ngOnInit(): void {
  }
}
