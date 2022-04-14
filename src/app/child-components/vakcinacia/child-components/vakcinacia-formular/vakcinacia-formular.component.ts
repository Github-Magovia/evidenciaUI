import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vakcinacia} from "../../../../../models/vakcinacia.model";

@Component({
  selector: 'app-vakcinacia-formular',
  templateUrl: './vakcinacia-formular.component.html',
  styleUrls: ['./vakcinacia-formular.component.css']
})
export class VakcinaciaFormularComponent implements OnInit {

  vakcinaciaForm: FormGroup;
  @ViewChild('content', { static: true }) modal: ElementRef;
  showAlert: boolean;

  @Input()
  set vakcinacia(data: Vakcinacia) {
    if (data) { this.naplnFormular(data); }
  }
  @Output()
  createVakcinacia: EventEmitter<Vakcinacia>;
  @Output()
  editVakcinacia: EventEmitter<Vakcinacia>;
  @Output()
  deleteVakcinacia: EventEmitter<number>;

  //TODO Fix Date with backend
  constructor(private modalService: NgbModal) {
    this.showAlert = false;
    this.createVakcinacia = new EventEmitter<Vakcinacia>();
    this.editVakcinacia = new EventEmitter<Vakcinacia>();
    this.deleteVakcinacia = new EventEmitter<number>();
    this.vakcinaciaForm = new FormGroup({
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

  private naplnFormular(v: Vakcinacia): void {
    this.vakcinaciaForm.controls['id'].setValue(v.id);
    this.vakcinaciaForm.controls['idPerson'].setValue(v.idPerson);
    this.vakcinaciaForm.controls['idVaccine'].setValue(v.idVaccine);
    this.vakcinaciaForm.controls['firstName'].setValue(v.firstName);
    this.vakcinaciaForm.controls['lastName'].setValue(v.lastName);
    this.vakcinaciaForm.controls['type'].setValue(v.type);
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
      this.createVakcinacia.emit({
        idPerson: this.vakcinaciaForm.value.idPerson,
        idVaccine: this.vakcinaciaForm.value.idVaccine,
        firstName: this.vakcinaciaForm.value.firstName,
        lastName: this.vakcinaciaForm.value.lastName,
        type: this.vakcinaciaForm.value.type
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
    this.editVakcinacia.emit(this.vakcinaciaForm.value);
    this.vakcinaciaForm.reset();
  }

  public zastavUpravu(): void {
    this.vakcinacia = undefined;
    this.vakcinaciaForm.reset();
  }

  public zmaz(): void {
    this.deleteVakcinacia.emit(this.vakcinaciaForm.value.id);
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  ngOnInit(): void {
  }
}
