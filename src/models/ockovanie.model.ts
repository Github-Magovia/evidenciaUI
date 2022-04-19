export class Ockovanie{
  id?: number;
  idPerson: number;
  idVaccine: number;
  firstName?: string;
  lastName?: string;
  type?: string;
  dateOfVaccination: string


  constructor(id: number, idPerson: number, idVaccine: number, firstName: string, lastName: string, type: string, dateOfVaccination: string) {
    this.id = id;
    this.idPerson = idPerson;
    this.idVaccine = idVaccine;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
    this.dateOfVaccination = dateOfVaccination;
  }
}
