import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import {AdminTicketResume} from "@core/model/admin/AdminTicketResume";

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http: HttpClient) {
  }

  public getAllClientiCodes() {
    return this.http.get<string[]>(`${environment.apiUrl}/${environment.servizi.adminService.getAllClientiCodes}`)
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

  public getAdminResumeTicket() {
    return this.http.get<AdminTicketResume>(`${environment.apiUrl}/${environment.servizi.adminService.getAllTicketAdmin}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  deleteCliente(id: number) {
    return this.http.delete(`${environment.apiUrl}/${environment.servizi.adminService.deleteCliente}/` + id).pipe(
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
