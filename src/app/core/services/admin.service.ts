import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) {
  }

  public getAllClientiCodes() {
    return this.http.get(`${environment.apiUrl}/${environment.servizi.adminService.getAllClientiCodes}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public getAllClienti() {
    return this.http.get<ClienteElementTable[]>(`${environment.apiUrl}/${environment.servizi.adminService.getAllCliente}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }


  addCliente(rawValue: ClienteElementTable) {
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.adminService.insertCliente}`, rawValue)
      .pipe(
        map((result) => {
          return result
        })
      );
  }
}
