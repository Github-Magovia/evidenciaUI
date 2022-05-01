export class Termin {
  id?: number;
  idPerson: number;
  vaccinationCentre: String;
  dateOfVaccination: String;

  constructor(id: number, idPerson:number, vaccinationCentre: String, dateOfVaccination: String) {
    this.id = id;
    this.idPerson = idPerson;
    this.vaccinationCentre = vaccinationCentre;
    this.dateOfVaccination = dateOfVaccination;
  }
}
