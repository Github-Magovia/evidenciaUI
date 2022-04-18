import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ockovanie} from "../../../../models/ockovanie.model";

@Injectable({
  providedIn: 'root'
})
export class OckovanieService {

  private apiUrl = 'http://localhost:8080/api/vaccinations';

  constructor(private http: HttpClient) { }

  public createVaccination(o: Ockovanie): Observable<Ockovanie> { return this.http.post<Ockovanie>(`${this.apiUrl}`, o); }

  public getVaccination(): Observable<Ockovanie[]> { return this.http.get<Ockovanie[]>(`${this.apiUrl}`); }

  public getVaccinationById(vaccinationId: number): Observable<Ockovanie> {
    return this.http.get<Ockovanie>(`${this.apiUrl}/${vaccinationId}`);
  }

  public updateVaccination(vaccinationId: number, o: Ockovanie): Observable<Ockovanie> {
    return this.http.put<Ockovanie>(`${this.apiUrl}/${vaccinationId}`, o);
  }

  public deleteVaccination(vaccinationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${vaccinationId}`); }

}
