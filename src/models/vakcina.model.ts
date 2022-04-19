export class Vakcina {
  id?: number;
  name: String;
  type: String;
  amountOfVaccines: number;
  amountToCompleteVaccination: number;
  daysToFullVaccination: number;
  durationOfVaccine: number;

  constructor(id: number, name: String, type: String, amountOfVaccines: number, amountToCompleteVaccination: number, daysToFullVaccination: number, durationOfVaccine: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.amountOfVaccines = amountOfVaccines;
    this.amountToCompleteVaccination = amountToCompleteVaccination;
    this.daysToFullVaccination = daysToFullVaccination;
    this.durationOfVaccine = durationOfVaccine;
  }
}
