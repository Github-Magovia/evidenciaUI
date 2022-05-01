import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Termin} from "../../../../models/termin.model";

@Injectable({
  providedIn: 'root'
})
export class TerminyService {
  private apiUrl = 'http://localhost:8080/api/terms';

  constructor(private http: HttpClient) { }

  public createTerm(t: Termin): Observable<Termin> { return this.http.post<Termin>(`${this.apiUrl}`, t); }

  public getTerms(): Observable<Termin[]> { return this.http.get<Termin[]>(`${this.apiUrl}`); }

  public getTermById(termId: number): Observable<Termin> {
    return this.http.get<Termin>(`${this.apiUrl}/${termId}`);
  }

  public updateTerm(termId: number, t: Termin): Observable<Termin> {
    return this.http.put<Termin>(`${this.apiUrl}/${termId}`, t);
  }

  public deleteTerm(termId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${termId}`); }


}
