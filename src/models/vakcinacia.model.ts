export class Vakcinacia{
  id?: number;
  idPerson: number;
  idVaccine: number;
  firstName: String;
  lastName: String;
  type: String;


  constructor(id: number, idPerson: number, idVaccine: number, firstName: String, lastName: String, type: String) {
    this.id = id;
    this.idPerson = idPerson;
    this.idVaccine = idVaccine;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
  }
}
