import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import {AdminTicketResume} from "@core/model/admin/AdminTicketResume";
import {OperatoreElementTable} from "@core/model/admin/OperatoreElementTable";
import {AdminDashboardResume} from "@core/model/admin/AdminDashboardResume";

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


  public getAllOperatoreNominativo() {
    return this.http.get<string[]>(`${environment.apiUrl}/${environment.servizi.adminService.getAllImpiegatoName}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public getAdminResume() {
    return this.http.get<AdminDashboardResume>(`${environment.apiUrl}/${environment.servizi.adminService.getDashboardResume}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public getAdminResumeParam(anno: number, mese: number) {
    return this.http.post<AdminDashboardResume>(`${environment.apiUrl}/${environment.servizi.adminService.getDashboardResume}`, {
      anno: anno,
      mese: mese
    })
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

  deleteCliente(id: number|null) {
    return this.http.delete(`${environment.apiUrl}/${environment.servizi.adminService.deleteCliente}/` + id).pipe(
      map((result) => {
        return result
      })
    );
  }

  deleteOperatore(id: number) {
    return this.http.delete(`${environment.apiUrl}/${environment.servizi.adminService.deleteOperatore}/` + id).pipe(
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

  addLogoCliente(file: File, id: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.adminService.insertLogoCliente}/`+id, formData)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  getLogoCliente(id:string){

    return this.http.get(`${environment.apiUrl}/${environment.servizi.ticketing.getLogoCliente}/`+id, { responseType: 'blob' });
  }

  getAllOperatore() {
    return this.http.get<OperatoreElementTable[]>(`${environment.apiUrl}/${environment.servizi.adminService.getAllOperatore}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  getAllOperatoreFR() {
    return this.http.get<OperatoreElementTable[]>(`${environment.apiUrl}/${environment.servizi.adminService.getAllOperatoreFR}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  insertOperatore(operatore: OperatoreElementTable) {
    console.log(operatore)
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.adminService.insertOperatore}`, operatore)
      .pipe(
        map((result) => {
          return result
        })
      );
  }
}
