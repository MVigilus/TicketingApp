import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../model/User";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";

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

}
