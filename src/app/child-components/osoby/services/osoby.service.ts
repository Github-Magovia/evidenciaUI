import { Injectable } from '@angular/core';
import {Osoba} from "../../../../models/osoba.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class OsobyService {
  private apiUrl = 'http://localhost:8080/api/people';

  constructor(private http: HttpClient) { }

  public createPerson(o: Osoba): Observable<Osoba> { return this.http.post<Osoba>(`${this.apiUrl}`, o); }

  public getPeople(): Observable<Osoba[]> { return this.http.get<Osoba[]>(`${this.apiUrl}`); }

  public getPersonById(personId: number): Observable<Osoba> {
    return this.http.get<Osoba>(`${this.apiUrl}/${personId}`);
  }

  public updatePerson(personId: number, o: Osoba): Observable<Osoba> {
    return this.http.put<Osoba>(`${this.apiUrl}/${personId}`, o);
  }

  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${personId}`); }

}
