import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-terminy-formular',
  templateUrl: './terminy-formular.component.html',
  styleUrls: ['./terminy-formular.component.css']
})
export class TerminyFormularComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  terminyForm: FormGroup;

  lastDate: Date = null;

  shouldDisplayDate(date: Date) : boolean {
    if (date != this.lastDate) {
      this.lastDate = date;
      return true;
    }
    return false;
  }

}
