import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Osoba} from "../../../../../models/osoba.model";

@Component({
  selector: 'app-osoby-formular',
  templateUrl: './osoby-formular.component.html',
  styleUrls: ['./osoby-formular.component.css']
})
export class OsobyFormularComponent implements OnInit {
  osobaForm: FormGroup;
  @ViewChild('content', { static: true }) modal: ElementRef;
  showAlert: boolean;

  @Input()
  set osoba(data: Osoba) {
    if (data) { this.naplnFormular(data); }
  }
  @Output()
  createOsoba: EventEmitter<Osoba>;
  @Output()
  editOsoba: EventEmitter<Osoba>;
  @Output()
  deleteOsoba: EventEmitter<number>;

  //TODO Fix Date with backend
  constructor(private modalService: NgbModal) {
    this.showAlert = false;
    this.createOsoba = new EventEmitter<Osoba>();
    this.editOsoba = new EventEmitter<Osoba>();
    this.deleteOsoba = new EventEmitter<number>();
    this.osobaForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
        ]),
      dateOfBirth: new FormControl(null, [
        Validators.required
      ]),
      sex: new FormControl(null, [
        Validators.required
      ]),
      status: new FormControl(null)
    });
  }

  private naplnFormular(o: Osoba): void {
    this.osobaForm.controls['id'].setValue(o.id);
    this.osobaForm.controls['firstName'].setValue(o.firstName);
    this.osobaForm.controls['lastName'].setValue(o.lastName);
    this.osobaForm.controls['dateOfBirth'].setValue(o.dateOfBirth);
    this.osobaForm.controls['sex'].setValue(o.sex);
    this.osobaForm.controls['status'].setValue(o.status);
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
      this.createOsoba.emit({
        firstName: this.osobaForm.value.firstName,
        lastName: this.osobaForm.value.lastName,
        dateOfBirth: this.osobaForm.value.dateOfBirth,
        sex: this.osobaForm.value.sex,
        status: this.osobaForm.value.status
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
    this.editOsoba.emit(this.osobaForm.value);
    this.osobaForm.reset();
  }

  public zastavUpravu(): void {
    this.osoba = undefined;
    this.osobaForm.reset();
  }

  public zmaz(): void {
    this.deleteOsoba.emit(this.osobaForm.value.id);
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  ngOnInit(): void {
  }
}
