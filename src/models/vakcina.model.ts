export class Vakcina{
  id?: number;
  name: String;
  type: String;
  amountOfVaccines: number;
  amountToCompleteVaccination: number;


  constructor(id: number, name: String, type: String, amountOfVaccines: number, amountToCompleteVaccination) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.amountOfVaccines = amountOfVaccines;
    this.amountToCompleteVaccination = amountToCompleteVaccination;
  }
}
