export class Termin {
  id?: number;
  personId: number;
  vaccinationCentre: String;
  dateOfVaccination: String;

  constructor(id: number, personId: number, vaccinationCentre: String, dateOfVaccination: String) {
    this.id = id;
    this.personId = personId;
    this.vaccinationCentre = vaccinationCentre;
    this.dateOfVaccination = dateOfVaccination;
  }
}
