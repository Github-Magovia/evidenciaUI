export class Termin {
  id?: number;
  vaccinationCentre: String;
  dateOfVaccination: String;
  timeOfVaccination: String;
  constructor(id: number, vaccinationCentre: String, dateOfVaccination: String, timeOfVaccination: String) {
    this.id = id;
    this.vaccinationCentre = vaccinationCentre;
    this.dateOfVaccination = dateOfVaccination;
    this.timeOfVaccination = timeOfVaccination;
  }
}
