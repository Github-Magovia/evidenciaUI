export class Vakcina{
  id?: number;
  nazov: String;
  typ: String;
  mnozstvo: number;


  constructor(id: number, nazov: String, typ: String, mnozstvo: number) {
    this.id = id;
    this.nazov = nazov;
    this.typ = typ;
    this.mnozstvo = mnozstvo;
  }
}
