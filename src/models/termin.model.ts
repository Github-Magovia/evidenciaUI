export class Termin {
  id?: number;
  vaccinationCentre: String;
  dateOfVaccination: String;

  constructor(id: number, vaccinationCentre: String, dateOfVaccination: String) {
    this.id = id;
    this.vaccinationCentre = vaccinationCentre;
    this.dateOfVaccination = dateOfVaccination;
  }
}
