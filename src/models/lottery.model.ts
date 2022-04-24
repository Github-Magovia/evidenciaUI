export class Lottery {
  id: number;
  firstName: string;
  lastName: string;
  amount: number;


  constructor(id: number, firstName: string, lastName: string, amount: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.amount = amount;
  }
}
