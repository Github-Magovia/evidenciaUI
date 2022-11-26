import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vakcina} from "../../../../models/vakcina.model";

@Injectable({
  providedIn: 'root'
})
export class VakcinaService {

  private apiUrl = 'http://localhost:8081/api/vaccines';

  constructor(private http: HttpClient) { }

  public createVaccine(v: Vakcina): Observable<Vakcina> { return this.http.post<Vakcina>(`${this.apiUrl}`, v); }

  public getVaccine(): Observable<Vakcina[]> { return this.http.get<Vakcina[]>(`${this.apiUrl}`); }

  public getVaccineById(vaccineId: number): Observable<Vakcina> {
    return this.http.get<Vakcina>(`${this.apiUrl}/${vaccineId}`);
  }

  public updateVaccine(vaccineId: number, o: Vakcina): Observable<Vakcina> {
    return this.http.put<Vakcina>(`${this.apiUrl}/${vaccineId}`, o);
  }

  public deleteVaccine(vaccineId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${vaccineId}`); }

}
