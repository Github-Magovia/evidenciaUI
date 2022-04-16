export enum VaccinationStatus {
  NONE, PARTIAL, FULL, BOOSTER
}

export class Osoba{
  id?: number;
  firstName: String;
  lastName: String;
  dateOfBirth: String;
  sex: String;
  status?: VaccinationStatus;


  constructor(id: number, firstName: String, lastName: String, dateOfBirth: String, sex: String, status: VaccinationStatus) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.status = status;
  }
}
