import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lottery} from "../../../../../models/lottery.model";

@Injectable({
  providedIn: 'root'
})
export class LotteryService {

  private apiUrl = 'http://localhost:8080/api/lottery';

  constructor(private http: HttpClient) { }


  public getWinners(): Observable<Lottery[]> {
    return this.http.get<Lottery[]>(`${this.apiUrl}`);
  }


}
