import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {Osoba} from "../../../../../models/osoba.model";

@Component({
  selector: 'app-osoby-formular',
  templateUrl: './osoby-formular.component.html',
  styleUrls: ['./osoby-formular.component.css']
})
export class OsobyFormularComponent implements OnInit {
  osobaForm: FormGroup;
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

  constructor(private modalService: NgbModal) {
    this.showAlert = false;
    this.createOsoba = new EventEmitter<Osoba>();
    this.editOsoba = new EventEmitter<Osoba>();
    this.osobaForm = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      dateOfBirth: new FormControl(null),
      sex: new FormControl(null)
    });
  }

  private naplnFormular(o: Osoba): void {
    this.osobaForm.controls['id'].setValue(o.id);
    this.osobaForm.controls['firstName'].setValue(o.firstName);
    this.osobaForm.controls['lastName'].setValue(o.lastName);
    this.osobaForm.controls['dateOfBirth'].setValue(o.lastName);
    this.osobaForm.controls['sex'].setValue(o.sex);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((reason) => {
      this.spracuj(reason);
    });
  }

  private spracuj(reason: any): void {
    if (reason === "add") {
      this.createOsoba.emit({
        firstName: this.osobaForm.value.firstName,
        lastName: this.osobaForm.value.lastName,
        dateOfBirth: this.osobaForm.value.dateOfBirth,
        sex: this.osobaForm.value.sex
      });
      this.toggleAlert(false);
    } else {
      this.toggleAlert(true);
    }
    this.osobaForm.reset();
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  ngOnInit(): void {
  }
}
