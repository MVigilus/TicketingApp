import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {OperatoreResume} from "@core/model/ticketing/OperatoreResume";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAll() {
    console.log(`${environment.apiUrl}/${environment.servizi.api.getAll}`)
    return this.http.get(`${environment.apiUrl}/${environment.servizi.api.getAll}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  getOperatoreResume(clienti: string[]) {
    return this.http.post<OperatoreResume>(`${environment.apiUrl}/${environment.servizi.operatoreService.getResumeOperatore}`, {clienti: clienti})
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  updateStatusTicket(id: number) {
    return this.http.put(`${environment.apiUrl}/${environment.servizi.operatoreService.updateTicketStatus}/` + id, {})
      .pipe(
        map((result) => {
          return result
        })
      );
  }

}
