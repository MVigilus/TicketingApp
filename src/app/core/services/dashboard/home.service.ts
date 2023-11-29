import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {OperatoreResume} from "@core/model/ticketing/OperatoreResume";
import {TicketTableElement} from "@core/model/ticketing/TicketTableElement";
import {AdminTicketResume} from "@core/model/admin/AdminTicketResume";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getLogoCliente(id: string | null){
    return this.http.get(`${environment.apiUrl}/${environment.servizi.ticketing.getLogoCliente}/`+id, { responseType: 'blob' });
  }

  public exportResumeTicketOperator(method:string,params:string[]): Observable<void>  {
    if(method!=''){
      return this.http.get(`${environment.apiUrl}/${environment.servizi.operatoreService.exportExcel}P?method=${method}&param1=${params[0]}&param2=${params[1]}&status=${params[2]}&cliente=${params[3]}`, {
        responseType: 'blob',
        observe: 'response'
      }).pipe(map((response: HttpResponse<Blob>) => {
        const contentDispositionHeader = response.headers.get('content-disposition');
        const fileName = contentDispositionHeader?.split(';')[1].trim().split('=')[1];
        this.downloadFile(response.body, fileName);
      }));
    }

    return this.http.get(`${environment.apiUrl}/${environment.servizi.operatoreService.exportExcel}?status=${params[2]}&cliente=${params[3]}`, {
      responseType: 'blob',
      observe: 'response'
    }).pipe(map((response: HttpResponse<Blob>) => {
      const contentDispositionHeader = response.headers.get('content-disposition');
      const fileName = contentDispositionHeader?.split(';')[1].trim().split('=')[1];
      this.downloadFile(response.body, fileName);
    }));

  }

  public exportResumeTicketCliente(cliente:string,method:string,params:string[]): Observable<void>  {
    if(method!=''){
      return this.http.get(`${environment.apiUrl}/${environment.servizi.clienteService.exportExcel}P?method=${method}&param1=${params[0]}&param2=${params[1]}&status=${params[2]}&cliente=${cliente}&operatore=${params[3]}`, {
        responseType: 'blob',
        observe: 'response'
      }).pipe(map((response: HttpResponse<Blob>) => {
        const contentDispositionHeader = response.headers.get('content-disposition');
        const fileName = contentDispositionHeader?.split(';')[1].trim().split('=')[1];
        this.downloadFile(response.body, fileName);
      }));
    }

    return this.http.get(`${environment.apiUrl}/${environment.servizi.clienteService.exportExcel}?status=${params[2]}&cliente=${cliente}&operatore=${params[3]}`, {
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
    downloadLink.setAttribute('download', "ReportASP");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/${environment.servizi.api.getAll}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  public getAllOperatoreNominativo() {
    return this.http.get<string[]>(`${environment.apiUrl}/${environment.servizi.clienteService.getAllImpiegatoName}`)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  getOperatoreResume(clienti: string[],method:string,params:string[]) {

    if(method!=''){
      return this.http.get<OperatoreResume>(`${environment.apiUrl}/${environment.servizi.operatoreService.getResumeOperatore}P?method=${method}&param1=${params[0]}&param2=${params[1]}`)
        .pipe(
          map((result) => {
            return result
          })
        );
    }
    return this.http.post<OperatoreResume>(`${environment.apiUrl}/${environment.servizi.operatoreService.getResumeOperatore}`, {clienti: clienti})
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  getClienteResume(cliente: string,method:string,params:string[]) {

    if(method!=''){
      return this.http.post<OperatoreResume>(`${environment.apiUrl}/${environment.servizi.clienteService.getResumeCliente}P?method=${method}&param1=${params[0]}&param2=${params[1]}`, cliente)
        .pipe(
          map((result) => {
            return result
          })
        );
    }

    return this.http.post<OperatoreResume>(`${environment.apiUrl}/${environment.servizi.clienteService.getResumeCliente}`, cliente)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  updateNoteLavorazioneTicket(id: number,note:string) {
    console.log(note)
    return this.http.put(`${environment.apiUrl}/${environment.servizi.operatoreService.updateTicketNoteLavorazione}/` + id, note)
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

  updateStatusTicketLavorazione(element: TicketTableElement) {
    console.log("INSIDE SERVICE")
    console.log(element)
    return this.http.post<string>(`${environment.apiUrl}/${environment.servizi.operatoreService.updateTicketStatusLav}`, element)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  checkClientePassword(id: number,element:string) {
    return this.http.post<boolean>(`${environment.apiUrl}/${environment.servizi.ticketing.checkClientePassword}/`+id, element)
      .pipe(
        map((result) => {
          return result
        })
      );
  }

  updateStatusTickeChiuso(element: TicketTableElement) {
    console.log(element)
    return this.http.post<string>(`${environment.apiUrl}/${environment.servizi.operatoreService.updateTicketStatusChiuso}`, element)
      .pipe(
        map((result) => {
          return result
        })
      );
  }



}
