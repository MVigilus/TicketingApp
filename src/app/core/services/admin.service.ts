import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {ClienteElementTable} from "@core/model/admin/ClienteElementTable";
import {AdminTicketResume} from "@core/model/admin/AdminTicketResume";
import {OperatoreElementTable} from "@core/model/admin/OperatoreElementTable";
import {AdminDashboardResume} from "@core/model/admin/AdminDashboardResume";
import {Observable} from "rxjs";

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

  public UpdatePasswordCliente(id: number | null,password:string){
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.adminService.editClientePassword}/`+id, password)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public UpdatePasswordClienteTicket(id: number | null,password:string){
    console.log("PASSWORD "+password)
    return this.http.post<any>(`${environment.apiUrl}/${environment.servizi.adminService.editClienteTicketPassword}/`+id, password)
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

  public exportAdminResumeTicket(method:string,params:string[]): Observable<void>  {
    if(method!=''){
      return this.http.get(`${environment.apiUrl}/${environment.servizi.adminService.exportExcel}P?method=${method}&param1=${params[0]}&param2=${params[1]}`, {
        responseType: 'blob',
        observe: 'response'
      }).pipe(map((response: HttpResponse<Blob>) => {
        const contentDispositionHeader = response.headers.get('content-disposition');
        const fileName = contentDispositionHeader?.split(';')[1].trim().split('=')[1];
        this.downloadFile(response.body, fileName);
      }));
    }

    return this.http.get(`${environment.apiUrl}/${environment.servizi.adminService.exportExcel}`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(map((response: HttpResponse<Blob>) => {
      const contentDispositionHeader = response.headers.get('content-disposition');
      const fileName = contentDispositionHeader?.split(';')[1].trim().split('=')[1];
      this.downloadFile(response.body, fileName);
    }));

  }

  private downloadFile(data: Blob|null, fileName: string|undefined): void {
    const blob = new Blob([(data)?data:""], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', (fileName)?fileName:"");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  public getAdminResumeTicket(method:string,params:string[]) {
    if(method!=''){
      return this.http.get<AdminTicketResume>(`${environment.apiUrl}/${environment.servizi.adminService.getAllTicketAdmin}P?method=${method}&param1=${params[0]}&param2=${params[1]}`)
        .pipe(
          map((result) => {
            return result
          })
        );
    }

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
    if(!rawValue.password){
      rawValue.password="temporanea"
    }

    if(!rawValue.passwordticket){
      rawValue.passwordticket="temporanea"
    }

    console.log(JSON.stringify(rawValue))
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
