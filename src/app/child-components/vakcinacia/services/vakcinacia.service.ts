import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Vakcinacia} from "../../../../models/vakcinacia.model";

@Injectable({
  providedIn: 'root'
})
export class VakcinaciaService {

  private apiUrl = 'http://localhost:8080/api/vaccinations';

  constructor(private http: HttpClient) { }

  public createVaccination(v: Vakcinacia): Observable<Vakcinacia> { return this.http.post<Vakcinacia>(`${this.apiUrl}`, v); }

  public getVaccination(): Observable<Vakcinacia[]> { return this.http.get<Vakcinacia[]>(`${this.apiUrl}`); }

  public getVaccinationById(vaccinationId: number): Observable<Vakcinacia> {
    return this.http.get<Vakcinacia>(`${this.apiUrl}/${vaccinationId}`);
  }

  public updateVaccination(vaccinationId: number, o: Vakcinacia): Observable<Vakcinacia> {
    return this.http.put<Vakcinacia>(`${this.apiUrl}/${vaccinationId}`, o);
  }

  public deleteVaccination(vaccinationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${vaccinationId}`); }

}
