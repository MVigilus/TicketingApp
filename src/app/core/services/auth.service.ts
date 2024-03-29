import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from 'rxjs/operators';
import {User} from "../model/User";
import {Editprofile} from "@core/model/Editprofile";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/${environment.servizi.auth.login}`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
         // console.log(JSON.stringify(user))
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  loginCliente(username: string, password: string) {
    return this.http
      .post<User>(`${environment.apiUrl}/${environment.servizi.auth.loginCliente}`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // console.log(JSON.stringify(user))
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.currentUserSubject.next(this.currentUserValue);
    return this.http.post<string>(`${environment.apiUrl}/${environment.servizi.auth.logout}`, this.currentUserValue.token).pipe(
      map((res) => {
        return res;
      })
    );
  }

  resetPassword(email:string) {
    this.currentUserSubject.next(this.currentUserValue);
    return this.http.post<boolean>(`${environment.apiUrl}/${environment.servizi.auth.resetPassword}`,email).pipe(
      map((res) => {
        return res;
      })
    );
  }

  CheckJwt() {
    return this.http.post<boolean>(`${environment.apiUrl}/${environment.servizi.auth.checkJWT}`, this.currentUserValue.token).pipe(
      map((res) => {
        return res;
      })
    );
    // Use RxJS interval operator to execute the HTTP request every minute

  }

  CheckJwtCliente() {
    return this.http.post<boolean>(`${environment.apiUrl}/${environment.servizi.auth.checkJWT}`, this.currentUserValue.token).pipe(
      map((res) => {
        return res;
      })
    );
    // Use RxJS interval operator to execute the HTTP request every minute

  }

  editProfile(body:Editprofile){
    return this.http.post<User>(`${environment.apiUrl}/${environment.servizi.auth.editProfile}`,body).pipe(
      map((user) => {
        // console.log(JSON.stringify(user))
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }
}
