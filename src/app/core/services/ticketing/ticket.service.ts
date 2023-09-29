import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {User} from "../../model/User";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class TicketService{


  constructor(private http: HttpClient) {
  }

  public ClienteExist(codice: string | null){
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.ticketing.checkCliente}`,codice)
      .pipe(
        map((result) => {
          return result
        })
      );
  }


}
