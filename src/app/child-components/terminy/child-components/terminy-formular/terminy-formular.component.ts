import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Termin} from "../../../../../models/termin.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-terminy-formular',
  templateUrl: './terminy-formular.component.html',
  styleUrls: ['./terminy-formular.component.css']
})
export class TerminyFormularComponent implements OnInit {

  terminyForm: FormGroup;

  lastDate: Date = null;

  shouldDisplayDate(date: Date) : boolean {
    if (date != this.lastDate) {
      this.lastDate = date;
      return true;
    }
    return false;
  }

  @ViewChild('content', { static: true }) modal: ElementRef;
  showAlert: boolean;
  isEditing: boolean = false;

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
    this.showAlert = false;
    this.createTermin = new EventEmitter<Termin>();
    this.editTermin = new EventEmitter<Termin>();
    this.deleteTermin = new EventEmitter<number>();
    this.terminyForm = new FormGroup({
      id: new FormControl(null),
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
    this.terminyForm.controls['vaccinationCentre'].setValue(t.vaccinationCentre);
    this.terminyForm.controls['dateOfVaccination'].setValue(t.dateOfVaccination);
    this.terminyForm.controls['timeOfVaccination'].setValue(t.timeOfVaccination);
  }


 public add(): void {
      this.createTermin.emit({
        vaccinationCentre: this.terminyForm.value.vaccinationCentre,
        dateOfVaccination: this.terminyForm.value.dateOfVaccination,
        timeOfVaccination: this.terminyForm.value.timeOfVaccination,
      });
    Swal.fire("Termín pridaný", "Termín bol úspešne pridaný.", "success");
  }

  public toggleAlert(val: boolean) { this.showAlert = val; }

  public toggleEditing(val: boolean) { this.isEditing = val; }

  ngOnInit(): void {
  }
}


