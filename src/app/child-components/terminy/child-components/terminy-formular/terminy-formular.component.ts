import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Termin} from "../../../../../models/termin.model";
import Swal from "sweetalert2";
import {Osoba} from "../../../../../models/osoba.model";

@Component({
  selector: 'app-terminy-formular',
  templateUrl: './terminy-formular.component.html',
  styleUrls: ['./terminy-formular.component.css']
})
export class TerminyFormularComponent implements OnInit {

  terminyForm: FormGroup;

  lastDate: Date = null;

  ngOnInit(): void {
  }


  public naplnCas(cas: String): void{
    this.terminyForm.controls['timeOfVaccination'].setValue(cas);
  }
  @Input() osoby: Osoba[];
  @Input()
  set termin(data: Termin) {
    if (data) { this.naplnFormular(data); }
  }
  @Output()
  createTermin: EventEmitter<Termin>;
  @Output()
  editTermin: EventEmitter<Termin>;
  @Output()
  deleteTermin: EventEmitter<number>;

  constructor(private modalService: NgbModal) {
    this.createTermin = new EventEmitter<Termin>();
    this.editTermin = new EventEmitter<Termin>();
    this.deleteTermin = new EventEmitter<number>();
    this.terminyForm = new FormGroup({
      id: new FormControl(null),
      idPerson: new FormControl(null, [
        Validators.required
      ]),
      vaccinationCentre: new FormControl(null, [
        Validators.required
      ]),
      dateOfVaccination: new FormControl(null, [
        Validators.required
      ]),
      timeOfVaccination: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  private naplnFormular(t: Termin): void {
    this.terminyForm.controls['id'].setValue(t.id);
    this.terminyForm.controls['idPerson'].setValue(t.idPerson);
    this.terminyForm.controls['vaccinationCentre'].setValue(t.vaccinationCentre);
    this.terminyForm.controls['dateOfVaccination'].setValue(t.dateOfVaccination);
    this.terminyForm.controls['timeOfVaccination'].setValue(t.dateOfVaccination);
  }


 public add(): void {
      this.createTermin.emit({
        idPerson: this.terminyForm.value.idPerson,
        vaccinationCentre: this.terminyForm.value.vaccinationCentre,
        dateOfVaccination: this.terminyForm.value.dateOfVaccination + " " + this.terminyForm.value.timeOfVaccination
      });
    Swal.fire("Termín pridaný", "Termín bol úspešne pridaný.", "success");
    this.terminyForm.reset();
  }

  public uprav(): void{
    this.editTermin.emit(this.terminyForm.value);
    this.terminyForm.reset();
  }

  public zastavUpravu(): void {
    this.termin = undefined;
    this.terminyForm.reset();
  }

  public zmaz(): void {
    this.deleteTermin.emit(this.terminyForm.value.id);
  }


}


