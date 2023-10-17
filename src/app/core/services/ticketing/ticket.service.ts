import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {TicketReq} from "@core/model/ticketing/TicketReq";
import {TicketRes} from "@core/model/ticketing/TicketRes";

@Injectable({
  providedIn: 'root',
})
export class TicketService{


  constructor(private http: HttpClient) {
  }

  public ClienteExist(codice: string | null) {
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.ticketing.checkCliente}`, codice)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public InsertTicket(ticket: TicketReq) {
    return this.http.post<TicketRes>(`${environment.apiUrl}/${environment.servizi.ticketing.insertTicket}`, ticket)
      .pipe(
        map(result => {
          return result;
        })
      )
  }

  getLogoCliente(id: string | null){
    return this.http.get(`${environment.apiUrl}/${environment.servizi.ticketing.getLogoCliente}/`+id, { responseType: 'blob' });
  }


}
