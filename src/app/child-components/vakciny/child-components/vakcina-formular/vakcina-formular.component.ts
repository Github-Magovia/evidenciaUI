import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vakcina} from "../../../../../models/vakcina.model";

@Component({
  selector: 'app-vakcina-formular',
  templateUrl: './vakcina-formular.component.html',
  styleUrls: ['./vakcina-formular.component.css']
})
export class VakcinaFormularComponent implements OnInit {

  vakcinaForm: FormGroup;
  @ViewChild('content', { static: true }) modal: ElementRef;
  showAlert: boolean;

  @Input()
  set vakcina(data: Vakcina) {
    if (data) { this.naplnFormular(data); }
  }
  @Output()
  createVakcina: EventEmitter<Vakcina>;
  @Output()
  editVakcina: EventEmitter<Vakcina>;
  @Output()
  deleteVakcina: EventEmitter<number>;

  //TODO Fix Date with backend
  constructor(private modalService: NgbModal) {
    this.showAlert = false;
    this.createVakcina = new EventEmitter<Vakcina>();
    this.editVakcina = new EventEmitter<Vakcina>();
    this.deleteVakcina = new EventEmitter<number>();
    this.vakcinaForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
      amountOfVaccines: new FormControl(null, [
        Validators.required
      ]),
      amountToCompleteVaccination: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  private naplnFormular(v: Vakcina): void {
    this.vakcinaForm.controls['id'].setValue(v.id);
    this.vakcinaForm.controls['name'].setValue(v.name);
    this.vakcinaForm.controls['type'].setValue(v.type);
    this.vakcinaForm.controls['amountOfVaccines'].setValue(v.amountOfVaccines);
    this.vakcinaForm.controls['amountToCompleteVaccination'].setValue(v.amountToCompleteVaccination);
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
      this.createVakcina.emit({
        name: this.vakcinaForm.value.name,
        type: this.vakcinaForm.value.type,
        amountOfVaccines: this.vakcinaForm.value.amountOfVaccines,
        amountToCompleteVaccination: this.vakcinaForm.value.amountToCompleteVaccination
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
    this.editVakcina.emit(this.vakcinaForm.value);
    this.vakcinaForm.reset();
  }

  public zastavUpravu(): void {
    this.vakcina = undefined;
    this.vakcinaForm.reset();
  }

  public zmaz(): void {
    this.deleteVakcina.emit(this.vakcinaForm.value.id);
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  ngOnInit(): void {
  }
}
