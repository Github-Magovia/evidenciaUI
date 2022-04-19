export enum Gender {
  MALE, FEMALE, OTHER
}

export enum VaccinationStatus {
  NONE, PARTIAL, FULL, BOOSTER
}

export class Osoba{
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  sex: Gender;
  status?: VaccinationStatus;
  vaccineStart?: string;
  vaccineEnd?: string;

  constructor(id: number, firstName: string, lastName: string, dateOfBirth: string, sex: Gender, status: VaccinationStatus, vaccineStart: string, vaccineEnd: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
    this.status = status;
    this.vaccineStart = vaccineStart;
    this.vaccineEnd = vaccineEnd;
  }
}
