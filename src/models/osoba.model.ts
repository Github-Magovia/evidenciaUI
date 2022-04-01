export class Osoba{
  id?: number;
  firstName: String;
  lastName: String;
  dateOfBirth: String;
  sex: String;


  constructor(id: number, firstName: String, lastName: String, dateOfBirth: String, sex: String) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.sex = sex;
  }
}
